function GlassPanel({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl glass-panel ${className}`}
    >
      {children}
    </div>
  )
}

export default GlassPanel
