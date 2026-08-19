import GlassPanel from './GlassPanel.jsx'

function BuyingBriefInput({ value, onChange, onParse }) {
  return (
    <GlassPanel className="px-6 py-6">
      <label htmlFor="buying-brief" className="font-display text-base font-semibold text-white">
        Describe what you need
      </label>
      <p className="mt-1 text-sm text-slate-500">
        The procurement agent will use this brief to identify requirements and constraints —
        budget, quantity, specifications, delivery timeline, and authorization limit.
      </p>

      <textarea
        id="buying-brief"
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="I need 8 external monitors for new joiners. Budget is ₹20,000 per unit. Require 27-inch 4K displays with USB-C and delivery within 7 days."
        className="mt-4 w-full resize-none rounded-xl border border-[var(--color-glass-border)] bg-[rgba(20,23,55,0.35)] px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 transition-all duration-200 focus:border-indigo focus:shadow-[0_0_0_3px_rgba(99,102,241,0.18)] focus:outline-none"
      />

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => onParse && onParse()}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-2))' }}
        >
          Parse Requirements
        </button>
      </div>
    </GlassPanel>
  )
}

export default BuyingBriefInput