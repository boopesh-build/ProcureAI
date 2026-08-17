import GlassPanel from './GlassPanel.jsx'

function AuditTrail({ events }) {
  return (
    <GlassPanel className="px-6 py-6">
      <h2 className="font-display text-base font-semibold text-white">Audit Trail</h2>
      <p className="mt-1 text-sm text-slate-500">
        What was searched, compared, decided, why, and what action was taken.
      </p>

      <ol className="mt-4 space-y-3 border-l" style={{ borderColor: 'var(--color-glass-border)' }}>
        {events.map((event) => (
          <li key={event.id} className="relative pl-5">
            <span
              className="absolute left-[-4.5px] top-1.5 h-2 w-2 rounded-full"
              style={{ background: 'var(--color-indigo)' }}
            />
            <p className="text-sm font-medium text-slate-200">{event.action}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{event.detail}</p>
            <p className="mt-0.5 text-[11px] tabular text-slate-600">
              {new Date(event.time).toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ol>
    </GlassPanel>
  )
}

export default AuditTrail
