// Deterministic, local parser for simple buying briefs.
// Extracts: item, quantity, budgetPerUnit, deliveryTimeline, specifications, authorizationLimit, and soft preferences.

function numberFromString(str) {
  if (!str) return null
  const digits = String(str).replace(/[^0-9.]/g, '')
  if (!digits) return null
  return Number(digits.replace(/,/g, ''))
}

function parseAmountFromText(text) {
  if (!text) return null
  const t = String(text).trim()

  // 1) ₹ symbol with commas/decimals
  const rupee = /₹\s*([0-9,]+(?:\.[0-9]+)?)/.exec(t)
  if (rupee) return numberFromString(rupee[1])

  // 2) numbers with 'lakh' / 'lac' / 'l' modifiers (1.5 lakh => 150000)
  const lakh = /([0-9]+(?:\.[0-9]+)?)\s*(?:lakh|lakhs|lac|lacs|l)\b/i.exec(t)
  if (lakh) return Math.round(Number(lakh[1]) * 100000)

  // 3) numbers with 'k' or 'thousand' (150k => 150000)
  const k = /([0-9]+(?:\.[0-9]+)?)\s*(?:k|K|thousand)\b/.exec(t)
  if (k) return Math.round(Number(k[1]) * 1000)

  // 4) plain numbers with commas (like 1,50,000) or long digits (>=5 digits)
  const plain = /([0-9,]{4,})/.exec(t)
  if (plain) return numberFromString(plain[1])

  // 5) fallback: single number
  const single = /([0-9]+(?:\.[0-9]+)?)/.exec(t)
  if (single) return numberFromString(single[1])

  return null
}

function capitalize(s) {
  if (!s) return s
  return s
    .split(' ')
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ')
}

export function parseBrief(briefText) {
  const brief = (briefText || '').trim()
  if (!brief) return {}

  const lower = brief.toLowerCase()
  const parsed = {
    item: '',
    quantity: '',
    budgetPerUnit: '',
    deliveryTimeline: '',
    specifications: [],
    preferences: {},
    authorizationLimit: '',
  }

  // 1) Quantity + item: look for patterns like "need 15 office chairs" or "we need 20 laptops"
  const needMatch = /(?:\b(?:i|we)\s+need\b|\bneed\b)\s+(\d{1,5})\s+([a-z0-9\-\s]{2,60}?)(?=\.|,|\bon\b|\bfor\b|\bat\b|\bwith\b|\bbudget\b|\bunder\b|\bwithin\b|$)/i.exec(brief)
  if (needMatch) {
    parsed.quantity = needMatch[1]
    parsed.item = capitalize(needMatch[2].trim())
  } else {
    // fallback: find first currency and preceding token as item or first noun phrase
    const qtyFallback = /\b(\d{1,5})\b/.exec(brief)
    if (qtyFallback) parsed.quantity = qtyFallback[1]
    // try to find a product word before keywords like "for" or "budget"
    const itemFallback = /(?:need\s+\d+\s+)?([a-z0-9\-\s]{3,60})(?:,|\.|\sfor\s|\sat\s|\bbudget\b|$)/i.exec(brief)
    if (itemFallback) parsed.item = capitalize(itemFallback[1].trim())
  }

  // 2) Budget per unit: look for ₹ or rupee symbol or words like "per unit" / "each" / "at"
  // prefer per-unit matches (look for 'per unit', 'each', 'per item') when present
  const perUnitMatch = /(?:per unit|each|per item)\b[\s:,-]*₹?\s*([0-9,]+(?:\.[0-9]+)?)/i.exec(brief)
  if (perUnitMatch) {
    parsed.budgetPerUnit = String(numberFromString(perUnitMatch[1]) || '')
  } else {
    // generic rupee or under/at matches
    const rupeeMatch = /₹\s?([0-9,]+(?:\.[0-9]+)?)/.exec(brief)
    if (rupeeMatch) {
      // if multiple rupee matches exist, this will pick the first; that's acceptable for most briefs
      parsed.budgetPerUnit = String(numberFromString(rupeeMatch[1]) || '')
    } else {
      const underMatch = /under\s+₹?\s?([0-9,]+)/i.exec(brief)
      if (underMatch) parsed.budgetPerUnit = String(numberFromString(underMatch[1]) || '')
      else {
        const atMatch = /at\s+₹?\s?([0-9,]+)/i.exec(brief)
        if (atMatch) parsed.budgetPerUnit = String(numberFromString(atMatch[1]) || '')
      }
    }
  }

  // 3) Delivery timeline: within X days, delivery in X days, by DATE
  const withinDays = /within\s+(\d{1,3})\s+days/i.exec(brief)
  if (withinDays) parsed.deliveryTimeline = `Within ${withinDays[1]} days`
  else {
    const deliveryIn = /delivery\s+(?:in\s+)?(\d{1,3})\s+days/i.exec(brief)
    if (deliveryIn) parsed.deliveryTimeline = `Within ${deliveryIn[1]} days`
    else {
      const byDate = /by\s+([A-Za-z0-9\s\d,]+)/i.exec(brief)
      if (byDate) parsed.deliveryTimeline = `By ${byDate[1].trim()}`
    }
  }

  // 4) Specifications & preferences: split by commas and filter
  const segments = brief.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean)
  const specCandidates = []
  for (const seg of segments) {
    const low = seg.toLowerCase()
    // skip segments that describe budget, purchases, approval, or delivery
    if (low.match(/\b(budget|purchases|purchase|purchas(es)?|approval|required by|purchases above|purchases over|authorize|authorization|authorized)\b/)) continue
    if (low.includes('₹') || low.match(/\bwithin\b|\bdelivery\b|\bby\b/)) continue
    // skip the initial 'I need...' preamble if present
    if (low.match(/^(i need|we need|need)\b/)) {
      // extract anything after the quantity and item portion
      const afterNeed = seg.replace(/^(i need|we need|need)\s+\d+\s*/i, '').trim()
      if (afterNeed) specCandidates.push(afterNeed)
      continue
    }
    specCandidates.push(seg)
  }

  // Also capture inline descriptors immediately after the item in the same sentence
  const inlineAfterItem = /(?:\bneed\b\s+\d+\s+[a-z0-9\-\s]{1,60}?)(?:,|\s)([a-z0-9\-,\s]{3,120})/i.exec(brief)
  if (inlineAfterItem) {
    const inline = inlineAfterItem[1].split(/,|and/).map((s) => s.trim()).filter(Boolean)
    for (const i of inline) specCandidates.push(i)
  }

  // Clean up candidates into specification tokens
  const specs = []
  for (const s of specCandidates) {
    // ignore short generic words
    if (s.length < 2) continue
    // avoid capturing full sentences that are descriptions of approvals
    if (s.match(/purchases above|require|requirement|manager approval|requirement|authorization|approve|authorize/)) continue
    // convert things like '27-inch 4K displays with USB-C' => split by 'with' or 'and'
    const parts = s.split(/\bwith\b|\band\b|\bvs\b|\bvs.\b|\s?\/\s?/) .map((p)=>p.trim()).filter(Boolean)
    for (const p of parts) {
      // ignore if contains currency or delivery
      if (p.match(/₹|\bwithin\b|\bdelivery\b/)) continue
      // normalize
      const cleaned = p.replace(/(^the\s+|^a\s+)/i, '').trim()
      if (cleaned.length > 0) specs.push(capitalize(cleaned))
    }
  }

  // dedupe specs
  parsed.specifications = Array.from(new Set(specs))

  // 5) Soft preferences: attempt to find brand, vendor, warranty, delivery date
  const brandMatch = /brand(?:ed)?\s*[:]?[ \t]*([A-Za-z0-9\s\-]+)/i.exec(brief)
  if (brandMatch) parsed.preferences.brand = brandMatch[1].trim()

  const vendorMatch = /vendor(?:s)?\s*[:]?[ \t]*([A-Za-z0-9\s\-]+)/i.exec(brief)
  if (vendorMatch) parsed.preferences.vendor = vendorMatch[1].trim()

  const warrantyMatch = /warrant(?:y|ies)\b[\s:,-]*([A-Za-z0-9\s]+)/i.exec(brief)
  if (warrantyMatch) parsed.preferences.warranty = warrantyMatch[1].trim()

  // Delivery date preference (explicit date)
  if (!parsed.deliveryTimeline) {
    const deliveryDateMatch = /delivery required (?:by|on)\s+([A-Za-z0-9\s,]+)/i.exec(brief)
    if (deliveryDateMatch) parsed.preferences.deliveryDate = deliveryDateMatch[1].trim()
  }

  // 6) Authorization / approval threshold parsing
  // Split brief into sentences and look for sentences that mention approval/authorization semantics
  const approvalKeywords = ['approval', 'approve', 'authorized', 'authorization', 'manager approval', 'authorize', 'authorization limit', 'maximum authorized', 'without approval', 'no approval']
  const sentences = brief.split(/[\.\?!\n]/).map(s => s.trim()).filter(Boolean)
  for (const s of sentences) {
    const low = s.toLowerCase()
    // only consider sentences that reference approval/authorization or purchases/orders
    if (!approvalKeywords.some((k) => low.includes(k)) && !low.match(/\b(purchases|orders|anything|maximum|limit|can authorize|authorized spend|authorize)\b/)) continue

    // Some phrasing indicates 'up to X' (auto-approve up to X) or 'above/over X requires approval' (threshold X)
    // Extract the amount present in the same sentence
    const amount = parseAmountFromText(s)
    if (amount) {
      parsed.authorizationLimit = String(amount)
      break
    }
  }

  // Final cleanup: if item is present but contains trailing words like 'for the team', remove them
  if (parsed.item) {
    parsed.item = parsed.item.replace(/\s+for\b.*$/i, '').replace(/\s+for the.*$/i, '').trim()
  }

  // If no item was found, try to extract a product-like noun from the first sample scenarios or a simple heuristic
  if (!parsed.item) {
    const nounMatch = /(?:need\s+\d+\s+)?([a-z0-9\-\s]{3,60})/i.exec(brief)
    if (nounMatch) parsed.item = capitalize(nounMatch[1].trim())
  }

  return parsed
}

export default parseBrief
