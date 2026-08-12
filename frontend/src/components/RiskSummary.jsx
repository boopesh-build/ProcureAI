import GlassPanel from './GlassPanel.jsx'
import StatusBadge from './StatusBadge.jsx'
import { risks } from '../data/mockData.js'
import { riskSeverityMap } from '../data/statusMaps.js'

function RiskSummary() {
  return (
    <GlassPanel className="px-6 py-6">
      <h2 className="mb-4 font-display text-base font-semibold text-white">Risk Center</h2>

      <ul className="space-y-3">
        {risks.map((risk) => {
          const meta = riskSeverityMap[risk.severity]
          return (
            <li
              key={risk.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-200">{risk.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{risk.detail}</p>
              </div>
              <StatusBadge label={meta.label} tone={meta.tone} variant="pill" />
            </li>
          )
        })}
      </ul>
    </GlassPanel>
  )
}

export default RiskSummary
