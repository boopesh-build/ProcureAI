import GlassPanel from './GlassPanel.jsx'

function Stat({ label, value }) {
  return (
    <div
      className="rounded-xl border px-4 py-3"
      style={{ borderColor: 'var(--color-glass-border)', background: 'rgba(20,23,55,0.25)' }}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold tabular text-white">{value}</p>
    </div>
  )
}

function DiscoverySummary({ discovery, evaluation }) {
  return (
    <GlassPanel className="px-6 py-6">
      <h2 className="font-display text-base font-semibold text-white">Vendor Discovery</h2>
      <p className="mt-1 text-sm text-slate-500">
        Searched {discovery.sourcesSearched} simulated sources:{' '}
        {discovery.sources.map((s) => s.name).join(' · ')}.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Sources Searched" value={discovery.sourcesSearched} />
        <Stat label="Offers Found" value={discovery.offersFound} />
        <Stat label="Eligible" value={evaluation ? evaluation.eligibleCount : 0} />
        <Stat label="Rejected" value={evaluation ? evaluation.rejectedCount : 0} />
      </div>
    </GlassPanel>
  )
}

export default DiscoverySummary
