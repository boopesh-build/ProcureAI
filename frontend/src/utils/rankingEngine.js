// Ranking engine (PS1 requirement #3/#8). Scores only offers that already
// passed the constraint engine (eligible === true). Four explicit criteria:
// price, delivery speed, seller reliability, specification richness.

function normalize(value, min, max, invert = false) {
  if (max === min) return 1
  const ratio = (value - min) / (max - min)
  return invert ? 1 - ratio : ratio
}

export function rankOffers(eligibleOffers) {
  if (eligibleOffers.length === 0) return []

  const prices = eligibleOffers.map((o) => o.price)
  const deliveries = eligibleOffers.map((o) => o.deliveryDays)
  const reliabilities = eligibleOffers.map((o) => o.sellerReliability)
  const specCounts = eligibleOffers.map((o) => o.specifications.length)

  const scored = eligibleOffers.map((offer) => {
    const priceScore = normalize(offer.price, Math.min(...prices), Math.max(...prices), true)
    const deliveryScore = normalize(
      offer.deliveryDays,
      Math.min(...deliveries),
      Math.max(...deliveries),
      true,
    )
    const reliabilityScore = normalize(
      offer.sellerReliability,
      Math.min(...reliabilities),
      Math.max(...reliabilities),
    )
    const specScore = normalize(
      offer.specifications.length,
      Math.min(...specCounts),
      Math.max(...specCounts),
    )

    const totalScore =
      priceScore * 0.3 + deliveryScore * 0.25 + reliabilityScore * 0.25 + specScore * 0.2

    return {
      offer,
      criteria: {
        price: { value: offer.price, score: priceScore },
        delivery: { value: offer.deliveryDays, score: deliveryScore },
        reliability: { value: offer.sellerReliability, score: reliabilityScore },
        specFit: { value: offer.specifications.length, score: specScore },
      },
      totalScore,
    }
  })

  return scored.sort((a, b) => b.totalScore - a.totalScore)
}

/** Builds a short, human-readable justification for the top-ranked offer. */
export function explainTopOffer(ranked) {
  if (ranked.length === 0) return ''
  const top = ranked[0]
  const { offer, criteria } = top

  const strengths = []
  if (criteria.price.score >= 0.66) strengths.push('lowest price among eligible offers')
  if (criteria.delivery.score >= 0.66) strengths.push('fastest delivery')
  if (criteria.reliability.score >= 0.66) strengths.push('highest seller reliability')
  if (criteria.specFit.score >= 0.66) strengths.push('strongest specification match')

  const strengthText = strengths.length
    ? strengths.join(', ')
    : 'the best balance across price, delivery, and reliability'

  return `${offer.vendor} (${offer.evidence.reference}) is recommended for ${strengthText}. Price ₹${offer.price.toLocaleString('en-IN')}, delivery in ${offer.deliveryDays} day${offer.deliveryDays === 1 ? '' : 's'}, seller reliability ${Math.round(offer.sellerReliability * 100)}%.`
}
