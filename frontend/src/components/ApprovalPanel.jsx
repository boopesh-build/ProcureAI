import GlassPanel from './GlassPanel.jsx'
import StatusBadge from './StatusBadge.jsx'

function ApprovalPanel({ authorization, isApproved, onApprove }) {
  const { limit, unitPrice, quantity, totalPurchaseValue, withinLimit } = authorization

  return (
    <GlassPanel className="px-6 py-6">
      <h2 className="font-display text-base font-semibold text-white">Authorization &amp; Approval</h2>
      <p className="mt-1 text-sm text-slate-500">
        Total purchase value ₹{totalPurchaseValue.toLocaleString('en-IN')} (₹
        {unitPrice.toLocaleString('en-IN')} × {quantity}) vs authorization limit ₹
        {limit.toLocaleString('en-IN')}.
      </p>

      <div className="mt-4 flex items-center gap-3">
        {withinLimit ? (
          <>
            <StatusBadge label="WITHIN LIMIT" tone="success" variant="pill" />
            <span className="text-sm text-slate-400">
              Within the authorization limit — no human approval required.
            </span>
          </>
        ) : isApproved ? (
          <>
            <StatusBadge label="APPROVED" tone="success" variant="pill" />
            <span className="text-sm text-slate-400">Approved by human reviewer.</span>
          </>
        ) : (
          <>
            <StatusBadge label="APPROVAL REQUIRED" tone="warning" variant="pill" />
            <span className="text-sm text-slate-400">
              Exceeds the authorization limit — agent has stopped for human approval.
            </span>
          </>
        )}
      </div>

      {!withinLimit && !isApproved && (
        <button
          type="button"
          onClick={onApprove}
          className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, var(--color-indigo), var(--color-accent))',
            boxShadow: '0 6px 24px rgba(99, 102, 241, 0.35)',
          }}
        >
          Approve Purchase
        </button>
      )}
    </GlassPanel>
  )
}

export default ApprovalPanel
