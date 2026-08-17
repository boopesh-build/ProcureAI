import { useState } from 'react'
import GlassPanel from './GlassPanel.jsx'
import { hardConstraintFields, missingFieldMessages } from '../data/buyingRequestData.js'

function isFieldSatisfied(request, key) {
  const value = request[key]
  if (key === 'specifications') return value.length > 0
  return String(value ?? '').trim().length > 0
}

function ValidationSummary({ request }) {
  const [hasValidated, setHasValidated] = useState(false)

  const results = hardConstraintFields.map((field) => ({
    ...field,
    satisfied: isFieldSatisfied(request, field.key),
  }))
  const missing = results.filter((field) => !field.satisfied)

  return (
    <GlassPanel className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-white">Validate Request</h2>
        <button
          type="button"
          onClick={() => setHasValidated(true)}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, var(--color-indigo), var(--color-accent))',
            boxShadow: '0 6px 24px rgba(99, 102, 241, 0.35)',
          }}
        >
          Validate Request
        </button>
      </div>

      {hasValidated && (
        <div className="mt-5 space-y-2">
          {results.map((field) => (
            <div key={field.key} className="flex items-start gap-2 text-sm">
              <span className={field.satisfied ? 'text-success' : 'text-warning'}>
                {field.satisfied ? '✓' : '⚠'}
              </span>
              <span className={field.satisfied ? 'text-slate-300' : 'text-slate-400'}>
                {field.satisfied
                  ? `${field.label} identified`
                  : missingFieldMessages[field.key]}
              </span>
            </div>
          ))}

          {missing.length === 0 && (
            <p className="mt-4 text-sm font-medium text-success">
              All required constraints are captured.
            </p>
          )}
        </div>
      )}
    </GlassPanel>
  )
}

export default ValidationSummary