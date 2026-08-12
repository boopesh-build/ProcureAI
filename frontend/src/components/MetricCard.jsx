import GlassPanel from './GlassPanel.jsx'

function MetricCard({ label, value }) {
  return (
    <GlassPanel className="px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tabular text-white">{value}</p>
    </GlassPanel>
  )
}

export default MetricCard
