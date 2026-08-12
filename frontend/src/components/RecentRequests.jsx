import GlassPanel from './GlassPanel.jsx'
import StatusBadge from './StatusBadge.jsx'
import { recentRequests } from '../data/mockData.js'
import { requestStatusMap } from '../data/statusMaps.js'

function RecentRequests() {
  return (
    <GlassPanel className="px-6 py-6">
      <h2 className="mb-4 font-display text-base font-semibold text-white">Recent Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="pb-3 font-medium">Request</th>
              <th className="pb-3 font-medium">Quantity</th>
              <th className="pb-3 font-medium">Budget</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.map((request) => {
              const meta = requestStatusMap[request.status]
              return (
                <tr key={request.id} className="border-b border-white/[0.05] last:border-0">
                  <td className="py-3.5 font-medium text-slate-200">{request.name}</td>
                  <td className="py-3.5 tabular text-slate-400">{request.quantity}</td>
                  <td className="py-3.5 tabular text-slate-400">{request.budget}</td>
                  <td className="py-3.5">
                    <StatusBadge label={meta.label} tone={meta.tone} variant="pill" />
                  </td>
                  <td className="py-3.5 text-slate-500">{request.updated}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  )
}

export default RecentRequests
