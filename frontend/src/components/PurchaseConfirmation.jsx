import GlassPanel from './GlassPanel.jsx'
import StatusBadge from './StatusBadge.jsx'

function PurchaseConfirmation({ recommendation, request, isPurchased, confirmationId, onConfirm }) {
  const { offer } = recommendation
  const totalCost = offer.price * (Number(request.quantity) || 0)

  return (
    <GlassPanel className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-white">Purchase Simulation</h2>
        {isPurchased && <StatusBadge label="PURCHASED" tone="success" variant="pill" />}
      </div>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Vendor</dt>
          <dd className="text-slate-200">{offer.vendor}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Unit Price</dt>
          <dd className="tabular text-slate-200">₹{offer.price.toLocaleString('en-IN')}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Quantity</dt>
          <dd className="tabular text-slate-200">{request.quantity}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Total Cost</dt>
          <dd className="tabular font-semibold text-white">
            ₹{totalCost.toLocaleString('en-IN')}
          </dd>
        </div>
      </dl>

      {isPurchased ? (
        <p className="mt-4 text-sm text-success">
          Purchase confirmed — confirmation ID {confirmationId}. This is a simulated
          confirmation; no real order was placed.
        </p>
      ) : (
        <button
          type="button"
          onClick={onConfirm}
          className="mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, var(--color-indigo), var(--color-accent))',
            boxShadow: '0 6px 24px rgba(99, 102, 241, 0.35)',
          }}
        >
          Confirm Purchase
        </button>
      )}
    </GlassPanel>
  )
}

export default PurchaseConfirmation
