// Orchestration layer (PS1 requirement #8 workflow + audit trail).
// Combines discoveryEngine, constraintEngine, and rankingEngine into one
// deterministic pipeline run, plus builds the audit trail entries that
// explain what was searched, compared, decided, why, and what happened.

import { discoverOffers } from './discoveryEngine.js'
import { evaluateOffers } from './constraintEngine.js'
import { rankOffers, explainTopOffer } from './rankingEngine.js'
import { WORKFLOW_STATES } from '../data/workflowStates.js'

let auditCounter = 0
export function createAuditEvent(action, detail) {
  auditCounter += 1
  return {
    id: `evt-${auditCounter}`,
    time: new Date().toISOString(),
    action,
    detail,
  }
}

export function runProcurementPipeline(request) {
  const auditTrail = []
  auditTrail.push(
    createAuditEvent(
      'Buying brief captured',
      `${request.quantity || '—'} × ${request.item || 'item'}, budget ₹${
        request.budgetPerUnit || '—'
      }/unit, delivery: ${request.deliveryTimeline || '—'}`,
    ),
  )

  const discovery = discoverOffers(request)
  auditTrail.push(
    createAuditEvent(
      'Sources searched',
      `${discovery.sourcesSearched} sources searched (${discovery.sources
        .map((s) => s.name)
        .join(', ')})`,
    ),
  )

  if (discovery.offersFound === 0) {
    auditTrail.push(
      createAuditEvent(
        'No offers found',
        `No catalog offers matched "${request.item}" from either source.`,
      ),
    )
    return {
      state: WORKFLOW_STATES.NO_FEASIBLE_OPTION,
      discovery,
      evaluation: null,
      ranked: [],
      recommendation: null,
      authorization: null,
      auditTrail,
    }
  }

  auditTrail.push(
    createAuditEvent(
      'Offers discovered',
      `${discovery.offersFound} offers found for "${request.item}".`,
    ),
  )

  const evaluation = evaluateOffers(discovery.offers, request)
  auditTrail.push(
    createAuditEvent(
      'Constraint evaluation',
      `${evaluation.eligibleCount} eligible, ${evaluation.rejectedCount} rejected against budget, quantity, delivery, and specification constraints.`,
    ),
  )

  const eligibleOffers = evaluation.evaluated.filter((item) => item.eligible).map((e) => e.offer)
  const availableEligibleOffers = eligibleOffers.filter((offer) => offer.isAvailable)

  // Detect a top-vendor-unavailable situation by ranking the full eligible
  // set (including unavailable offers) and checking whether the winner
  // would have been unavailable.
  const allEligibleRanked = rankOffers(eligibleOffers)
  if (allEligibleRanked.length > 0 && !allEligibleRanked[0].offer.isAvailable) {
    const unavailableTop = allEligibleRanked[0].offer
    auditTrail.push(
      createAuditEvent(
        'Vendor availability check',
        `${unavailableTop.vendor} (${unavailableTop.evidence.reference}) was the top-ranked offer but is currently unavailable; falling back to the next available eligible offer.`,
      ),
    )
  }

  if (availableEligibleOffers.length === 0) {
    auditTrail.push(
      createAuditEvent(
        'No feasible option',
        'No available offer satisfies all hard constraints (budget, quantity, delivery, specifications).',
      ),
    )
    return {
      state: WORKFLOW_STATES.NO_FEASIBLE_OPTION,
      discovery,
      evaluation,
      ranked: [],
      recommendation: null,
      authorization: null,
      auditTrail,
    }
  }

  const ranked = rankOffers(availableEligibleOffers)
  const top = ranked[0]
  const reasoning = explainTopOffer(ranked)
  auditTrail.push(createAuditEvent('Ranking & recommendation', reasoning))

  const authorizationLimit = Number(request.authorizationLimit) || 0
  const quantity = Number(request.quantity) || 0
  const totalPurchaseValue = top.offer.price * quantity
  const withinLimit = authorizationLimit > 0 && totalPurchaseValue <= authorizationLimit
  const authorization = {
    limit: authorizationLimit,
    unitPrice: top.offer.price,
    quantity,
    totalPurchaseValue,
    withinLimit,
  }
  auditTrail.push(
    createAuditEvent(
      'Authorization check',
      `Total purchase value ₹${totalPurchaseValue.toLocaleString('en-IN')} (₹${top.offer.price.toLocaleString('en-IN')} × ${quantity}) vs authorization limit ₹${
        authorizationLimit ? authorizationLimit.toLocaleString('en-IN') : '—'
      } — ${withinLimit ? 'WITHIN LIMIT' : 'APPROVAL REQUIRED'}.`,
    ),
  )

  return {
    state: withinLimit ? WORKFLOW_STATES.READY_TO_PURCHASE : WORKFLOW_STATES.PENDING_APPROVAL,
    discovery,
    evaluation,
    ranked,
    recommendation: { offer: top.offer, criteria: top.criteria, reasoning },
    authorization,
    auditTrail,
  }
}
