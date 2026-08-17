import GlassPanel from './GlassPanel.jsx'
import OfferCard from './OfferCard.jsx'

function OfferList({ sources, evaluatedOffers }) {
  return (
    <GlassPanel className="px-6 py-6">
      <h2 className="font-display text-base font-semibold text-white">Offers by Source</h2>
      <p className="mt-1 text-sm text-slate-500">
        Every offer shows which source it came from and an evidence reference.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {sources.map((source) => {
          const offersForSource = evaluatedOffers.filter(
            (item) => item.offer.sourceId === source.id,
          )
          return (
            <div key={source.id}>
              <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {source.name} <span className="text-slate-600">— {source.kind}</span>
              </h3>
              <div className="space-y-3">
                {offersForSource.length === 0 ? (
                  <p className="text-xs text-slate-600">No offers from this source.</p>
                ) : (
                  offersForSource.map((item) => (
                    <OfferCard key={item.offer.id} evaluatedOffer={item} />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </GlassPanel>
  )
}

export default OfferList
