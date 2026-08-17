import { useState } from 'react'

function SpecificationChips({ specifications, onChange }) {
  const [draft, setDraft] = useState('')

  function addSpec() {
    const value = draft.trim()
    if (value && !specifications.includes(value)) {
      onChange([...specifications, value])
    }
    setDraft('')
  }

  function removeSpec(spec) {
    onChange(specifications.filter((item) => item !== spec))
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ',') {
              event.preventDefault()
              addSpec()
            }
          }}
          placeholder="Add a specification and press Enter"
          className="w-full rounded-lg border border-[rgba(255,255,255,0.72)] bg-[rgba(255,255,255,0.52)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[rgba(91,104,117,0.5)] transition-all duration-200 focus:border-[rgba(0,184,200,0.9)] focus:shadow-[0_0_0_6px_rgba(0,184,200,0.12)] focus:outline-none backdrop-blur-sm"
        />
        <button
          type="button"
          onClick={addSpec}
          className="shrink-0 rounded-lg border border-[rgba(255,255,255,0.72)] bg-[rgba(0,184,200,0.08)] px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:bg-[rgba(0,184,200,0.14)]"
        >
          Add
        </button>
      </div>

      {specifications.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {specifications.map((spec) => (
            <button
              type="button"
              key={spec}
              onClick={() => removeSpec(spec)}
              title="Remove"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-glass-border)] bg-[rgba(99,102,241,0.08)] px-3 py-1 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-danger/40 hover:text-danger"
            >
              {spec}
              <span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SpecificationChips