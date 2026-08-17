import GlassPanel from './GlassPanel.jsx'
import StatusBadge from './StatusBadge.jsx'

function AuthorizationLimitCard({ authorizationLimit, budgetPerUnit, quantity }) {
  const limit = Number(authorizationLimit) || 0
  const unitBudget = Number(budgetPerUnit) || 0
  const qty = Number(quantity) || 0
  const estimatedTotal = unitBudget * qty
  const hasValues = limit > 0 && unitBudget > 0 && qty > 0
  const withinLimit = hasValues && estimatedTotal <= limit

  return (
    <GlassPanel className="px-6 py-6">
      <h2 className="font-display text-base font-semibold text-white">Authorization Limit</h2>
      <p className="mt-1 text-sm text-slate-500">
        Maximum total purchase value the agent can authorize without human approval.
      </p>

      <div
        className="mt-4 flex items-baseline justify-between rounded-xl border px-4 py-3"
        style={{ borderColor: 'var(--color-glass-border)', background: 'rgba(20,23,55,0.3)' }}
      >
        <span className="text-sm text-slate-400">Authorization limit</span>
        <span className="font-display tabular text-lg font-semibold text-white">
          {limit ? `₹${limit.toLocaleString('en-IN')}` : '—'}
        </span>
      </div>

      <div
        className="mt-2 flex items-baseline justify-between rounded-xl border px-4 py-3"
        style={{ borderColor: 'var(--color-glass-border)', background: 'rgba(20,23,55,0.15)' }}
      >
        <span className="text-sm text-slate-400">Estimated total (budget × qty)</span>
        <span className="font-display tabular text-lg font-semibold text-slate-300">
          {hasValues ? `₹${estimatedTotal.toLocaleString('en-IN')}` : '—'}
        </span>
      </div>

      <div className="mt-4">
        {hasValues ? (
          <StatusBadge
            label={withinLimit ? 'WITHIN LIMIT' : 'APPROVAL REQUIRED'}
            tone={withinLimit ? 'success' : 'warning'}
            variant="pill"
          />
        ) : (
          <StatusBadge label="AWAITING VALUES" tone="neutral" variant="pill" />
        )}
      </div>

      <p className="mt-3 text-xs text-slate-600">
        Estimate only, based on budget per unit × quantity. The authoritative check runs after
        discovery, using the actual recommended offer's total purchase value.
      </p>
    </GlassPanel>
  )
}

export default AuthorizationLimitCard
