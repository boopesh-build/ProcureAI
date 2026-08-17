// Deterministic constraint engine (PS1 requirement #7).
// Pure functions only — no side effects, no randomness.

// Parses a delivery requirement into a number of days from "today".
// Supports "within N days" style text and absolute "by <date>" text.
// Falls back to null when it can't be parsed (treated as unconstrained).
export function parseRequiredDeliveryDays(deliveryTimeline, referenceDate = new Date()) {
  const text = String(deliveryTimeline || '').trim()
  if (!text) return null

  const withinMatch = text.match(/(\d+)\s*day/i)
  if (withinMatch) return Number(withinMatch[1])

  const byMatch = text.match(/by\s+(.+)/i)
  if (byMatch) {
    const parsed = new Date(byMatch[1])
    if (!Number.isNaN(parsed.getTime())) {
      const diffMs = parsed.getTime() - referenceDate.getTime()
      return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)))
    }
  }

  return null
}

function specSatisfied(requiredSpec, offerSpecifications) {
  const needle = requiredSpec.trim().toLowerCase()
  return offerSpecifications.some((spec) => spec.toLowerCase().includes(needle))
}

/**
 * Evaluates a single offer against the request's hard constraints.
 * Returns { eligible, reasons: string[] } — reasons is always populated
 * when eligible is false, and empty when true.
 */
export function evaluateOffer(offer, request) {
  const reasons = []

  const budgetPerUnit = Number(request.budgetPerUnit) || 0
  if (budgetPerUnit && offer.price > budgetPerUnit) {
    reasons.push(
      `Price exceeds budget by ₹${(offer.price - budgetPerUnit).toLocaleString('en-IN')}`,
    )
  }

  const quantityNeeded = Number(request.quantity) || 0
  if (quantityNeeded && offer.quantityAvailable < quantityNeeded) {
    reasons.push(
      `Insufficient stock: only ${offer.quantityAvailable} available, ${quantityNeeded} required`,
    )
  }

  const requiredDays = parseRequiredDeliveryDays(request.deliveryTimeline)
  if (requiredDays !== null && offer.deliveryDays > requiredDays) {
    reasons.push(
      `Delivery exceeds required timeline by ${offer.deliveryDays - requiredDays} day${
        offer.deliveryDays - requiredDays === 1 ? '' : 's'
      }`,
    )
  }

  const missingSpecs = (request.specifications || []).filter(
    (spec) => !specSatisfied(spec, offer.specifications),
  )
  if (missingSpecs.length > 0) {
    reasons.push(`Missing required specification: ${missingSpecs.join(', ')}`)
  }

  if (offer.evidenceConflict) {
    reasons.push(`Conflicting evidence: ${offer.conflictDetail}`)
  }

  return { eligible: reasons.length === 0, reasons }
}

/**
 * Evaluates a list of offers, returning each with its evaluation attached
 * plus aggregate counts for the discovery summary UI.
 */
export function evaluateOffers(offers, request) {
  const evaluated = offers.map((offer) => ({
    offer,
    ...evaluateOffer(offer, request),
  }))

  return {
    evaluated,
    eligibleCount: evaluated.filter((item) => item.eligible).length,
    rejectedCount: evaluated.filter((item) => !item.eligible).length,
  }
}
