import GlassPanel from './GlassPanel.jsx'
import { useProcurement } from '../context/ProcurementContext.jsx'

function Tile({ label, value }) {
  return (
    <GlassPanel className="px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tabular text-white">{value}</p>
    </GlassPanel>
  )
}

function LiveProcurementMetrics() {
  const { counts, activity } = useProcurement()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-sm font-semibold text-slate-300">
          Live Session Activity
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Reflects Buying Request activity from this session — separate from the demo metrics
          above.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Tile label="Requests Run" value={counts.activeRequests} />
        <Tile label="Awaiting Approval" value={counts.awaitingApproval} />
        <Tile label="Completed Purchases" value={counts.completedPurchases} />
        <Tile label="Risks / Exceptions" value={counts.risksExceptions} />
      </div>

      {activity.length > 0 && (
        <GlassPanel className="px-6 py-5">
          <h3 className="text-sm font-semibold text-slate-200">Recent Audit Activity</h3>
          <ul className="mt-3 space-y-2">
            {activity.map((item) => (
              <li key={item.id} className="text-xs text-slate-500">
                <span className="text-slate-300">{item.label}</span>
                <span className="tabular text-slate-600">
                  {' '}
                  — {new Date(item.time).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </GlassPanel>
      )}
    </div>
  )
}

export default LiveProcurementMetrics
