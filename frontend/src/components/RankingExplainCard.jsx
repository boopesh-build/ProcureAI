import GlassPanel from './GlassPanel.jsx'

function CriterionBar({ label, score, display }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">{label}</span>
        <span className="tabular text-slate-300">{display}</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
        <div
          className="h-1.5 rounded-full"
          style={{
            width: `${Math.round(score * 100)}%`,
            background: 'linear-gradient(90deg, var(--color-indigo), var(--color-accent))',
          }}
        />
      </div>
    </div>
  )
}

function RankingExplainCard({ recommendation, rankedCount }) {
  const { offer, criteria, reasoning } = recommendation

  return (
    <GlassPanel
      className="relative overflow-hidden px-6 py-6"
      style={{
        background:
          'linear-gradient(135deg, rgba(99,102,241,0.10), rgba(79,140,255,0.05) 60%, transparent)',
        borderColor: 'rgba(150,160,255,0.22)',
      }}
    >
      <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo/20 blur-3xl" />

      <p className="relative text-xs font-semibold uppercase tracking-wide text-accent">
        Recommended Offer · ranked #1 of {rankedCount} eligible
      </p>
      <p className="relative mt-2 font-display text-xl font-bold tracking-tight text-white">
        {offer.vendor} — {offer.product}
      </p>
      <p className="relative mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
        {reasoning}
      </p>

      <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <CriterionBar
          label="Price"
          score={criteria.price.score}
          display={`₹${offer.price.toLocaleString('en-IN')}`}
        />
        <CriterionBar
          label="Delivery"
          score={criteria.delivery.score}
          display={`${offer.deliveryDays} days`}
        />
        <CriterionBar
          label="Seller Reliability"
          score={criteria.reliability.score}
          display={`${Math.round(offer.sellerReliability * 100)}%`}
        />
        <CriterionBar
          label="Specification Fit"
          score={criteria.specFit.score}
          display={`${offer.specifications.length} matched`}
        />
      </div>

      <p className="relative mt-4 text-[11px] text-slate-600">
        Evidence: {offer.evidence.reference} · {offer.evidence.sourceName}
      </p>
    </GlassPanel>
  )
}

export default RankingExplainCard
