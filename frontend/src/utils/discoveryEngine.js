// Discovery engine (PS1 requirement #4/#5). Deterministic lookup against
// the local offer catalog — clearly a prototype dataset, not a live search.

import { offerCatalog, matchCatalogKey } from '../data/offerCatalog.js'
import { vendorSources } from '../data/vendorSources.js'

/**
 * Discovers offers for a buying request from the simulated catalog.
 * Returns sources searched (always both, since both are queried), the raw
 * offers found, and each offer's evidence (source name + reference id).
 */
export function discoverOffers(request) {
  const catalogKey = matchCatalogKey(request.item)
  const rawOffers = catalogKey ? offerCatalog[catalogKey] : []

  const offers = rawOffers.map((offer) => {
    const source = vendorSources.find((src) => src.id === offer.sourceId)
    return {
      ...offer,
      evidence: {
        sourceName: source?.name || offer.sourceId,
        sourceKind: source?.kind || 'Simulated Source',
        reference: offer.id,
      },
    }
  })

  return {
    catalogKey,
    sourcesSearched: vendorSources.length,
    sources: vendorSources,
    offers,
    offersFound: offers.length,
  }
}
