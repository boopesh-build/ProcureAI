import GlassPanel from './GlassPanel.jsx'
import StatusBadge from './StatusBadge.jsx'
import { hardConstraintFields } from '../data/buyingRequestData.js'

function isFieldSatisfied(request, key) {
  const value = request[key]
  if (key === 'specifications') return value.length > 0
  return String(value ?? '').trim().length > 0
}

function RequestSummary({ request }) {
  const isReady = hardConstraintFields.every((field) => isFieldSatisfied(request, field.key))

  return (
    <GlassPanel className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-white">Request Summary</h2>
        <StatusBadge
          label={isReady ? 'READY FOR VENDOR DISCOVERY' : 'INCOMPLETE'}
          tone={isReady ? 'success' : 'neutral'}
          variant="pill"
        />
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Item</dt>
          <dd className="text-slate-200">{request.item || '—'}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Quantity</dt>
          <dd className="tabular text-slate-200">{request.quantity || '—'}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Budget</dt>
          <dd className="tabular text-slate-200">
            {request.budgetPerUnit ? `₹${Number(request.budgetPerUnit).toLocaleString('en-IN')} / unit` : '—'}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Delivery</dt>
          <dd className="text-slate-200">{request.deliveryTimeline || '—'}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Authorization</dt>
          <dd className="tabular text-slate-200">
            {request.authorizationLimit
              ? `₹${Number(request.authorizationLimit).toLocaleString('en-IN')} / unit`
              : '—'}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        disabled={!isReady}
        className="mt-5 w-full rounded-lg border border-[var(--color-glass-border)] bg-[rgba(99,102,241,0.06)] px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 enabled:hover:bg-[rgba(99,102,241,0.14)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue to Vendor Discovery
      </button>
    </GlassPanel>
  )
}

export default RequestSummary