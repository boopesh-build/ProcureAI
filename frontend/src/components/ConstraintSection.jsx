import StatusBadge from './StatusBadge.jsx'

const TONE = {
  hard: { label: 'Hard Constraint', tone: 'accent' },
  soft: { label: 'Soft Preference', tone: 'neutral' },
}

function ConstraintSection({ kind, title, description, children, light = false }) {
  const meta = TONE[kind]
  return (
    <div
      className={`rounded-xl border px-5 py-4 backdrop-blur-md ${
        kind === 'hard'
          ? 'border-[rgba(150,160,255,0.2)] bg-[rgba(99,102,241,0.06)]'
          : light
          ? 'border-[var(--color-glass-border)] bg-[rgba(255,255,255,0.38)]'
          : 'border-[var(--color-glass-border)] bg-[rgba(20,23,55,0.2)]'
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
        </div>
        <StatusBadge label={meta.label} tone={meta.tone} variant="pill" />
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  )
}

export default ConstraintSection