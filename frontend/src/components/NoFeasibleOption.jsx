import GlassPanel from './GlassPanel.jsx'
import StatusBadge from './StatusBadge.jsx'

function NoFeasibleOption({ discovery, evaluation }) {
  const noMatch = discovery.offersFound === 0

  return (
    <GlassPanel className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-white">Vendor Discovery</h2>
        <StatusBadge label="NO FEASIBLE OPTION" tone="danger" variant="pill" />
      </div>

      {noMatch ? (
        <p className="mt-3 text-sm text-slate-400">
          No offers were found from either simulated source for this item. This prototype's
          catalog covers a limited set of demo items — try one of the example scenarios, or
          adjust the item name.
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm text-slate-400">
            {discovery.offersFound} offers were found, but none satisfy every hard constraint
            (or the only eligible offer is currently unavailable).
          </p>
          <ul className="mt-3 space-y-2">
            {evaluation.evaluated.map((item) => (
              <li key={item.offer.id} className="text-xs text-slate-500">
                <span className="font-medium text-slate-300">{item.offer.vendor}</span> —{' '}
                {item.reasons.join('; ') || 'Unavailable'}
              </li>
            ))}
          </ul>
        </>
      )}
    </GlassPanel>
  )
}

export default NoFeasibleOption
