const TONE_STYLES = {
  success: 'border-success/25 bg-success/10 text-success',
  warning: 'border-warning/25 bg-warning/10 text-warning',
  danger: 'border-danger/25 bg-danger/10 text-danger',
  accent: 'border-accent/25 bg-accent/10 text-accent',
  neutral: 'border-white/10 bg-white/5 text-slate-400',
}

const PULSE_DOT = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  accent: 'bg-accent',
  neutral: 'bg-neutral',
}

/**
 * StatusBadge
 * - variant="pulse" (default): animated dot + label, used for live system status.
 * - variant="pill": static colored label, used for pipeline/request/risk states.
 */
function StatusBadge({ label, tone = 'success', variant = 'pulse' }) {
  if (variant === 'pill') {
    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide ${TONE_STYLES[tone]}`}
      >
        {label}
      </span>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${PULSE_DOT[tone]}`}
        />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${PULSE_DOT[tone]}`} />
      </span>
      <span className="text-sm font-medium tracking-wide text-slate-300">{label}</span>
    </div>
  )
}

export default StatusBadge
