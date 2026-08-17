import StatusBadge from './StatusBadge.jsx'

function OfferCard({ evaluatedOffer }) {
  const { offer, eligible, reasons } = evaluatedOffer

  return (
    <div
      className="rounded-xl border px-4 py-4"
      style={{
        borderColor: eligible ? 'rgba(52,211,153,0.3)' : 'var(--color-glass-border)',
        background: eligible ? 'rgba(52,211,153,0.05)' : 'rgba(20,23,55,0.2)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">{offer.vendor}</p>
          <p className="text-xs text-slate-500">{offer.product}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge
            label={eligible ? 'Eligible' : 'Rejected'}
            tone={eligible ? 'success' : 'danger'}
            variant="pill"
          />
          {!offer.isAvailable && (
            <StatusBadge label="Unavailable" tone="neutral" variant="pill" />
          )}
          {offer.evidenceConflict && (
            <StatusBadge label="Evidence Conflict" tone="warning" variant="pill" />
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:grid-cols-4">
        <div>
          <p className="text-slate-500">Price</p>
          <p className="tabular text-slate-200">₹{offer.price.toLocaleString('en-IN')}</p>
        </div>
        <div>
          <p className="text-slate-500">Delivery</p>
          <p className="tabular text-slate-200">{offer.deliveryDays} days</p>
        </div>
        <div>
          <p className="text-slate-500">Available Qty</p>
          <p className="tabular text-slate-200">{offer.quantityAvailable}</p>
        </div>
        <div>
          <p className="text-slate-500">Reliability</p>
          <p className="tabular text-slate-200">{Math.round(offer.sellerReliability * 100)}%</p>
        </div>
      </div>

      <p className="mt-2.5 text-xs text-slate-500">
        Specifications: {offer.specifications.join(', ')}
      </p>

      <p className="mt-2 text-[11px] text-slate-600">
        Source: {offer.evidence.sourceName} ({offer.evidence.sourceKind}) · Evidence:{' '}
        {offer.evidence.reference} · Updated {offer.lastUpdated}
      </p>

      {!eligible && (
        <ul className="mt-2.5 space-y-1 border-t border-white/[0.06] pt-2.5">
          {reasons.map((reason) => (
            <li key={reason} className="text-xs text-warning">
              ⚠ {reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OfferCard
