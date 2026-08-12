import GlassPanel from './GlassPanel.jsx'
import { recommendation } from '../data/mockData.js'

function RecommendationCard() {
  return (
    <GlassPanel className="border-accent/15 bg-accent/[0.04] px-6 py-6">
      <p className="text-xs font-medium uppercase tracking-wide text-accent">
        Recommended Action
      </p>
      <p className="mt-2 font-display text-lg font-semibold text-white">
        {recommendation.action}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{recommendation.reason}</p>

      <button
        type="button"
        className="mt-5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
      >
        Review Recommendation
      </button>
    </GlassPanel>
  )
}

export default RecommendationCard
