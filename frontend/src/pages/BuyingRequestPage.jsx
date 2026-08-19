import { useMemo, useState } from 'react'
import BuyingBriefInput from '../components/BuyingBriefInput.jsx'
import ConstraintForm from '../components/ConstraintForm.jsx'
import AuthorizationLimitCard from '../components/AuthorizationLimitCard.jsx'
import ValidationSummary from '../components/ValidationSummary.jsx'
import RequestSummary from '../components/RequestSummary.jsx'
import ExampleRequests from '../components/ExampleRequests.jsx'
import WorkflowStateBadge from '../components/WorkflowStateBadge.jsx'
import DiscoverySummary from '../components/DiscoverySummary.jsx'
import OfferList from '../components/OfferList.jsx'
import RankingExplainCard from '../components/RankingExplainCard.jsx'
import ApprovalPanel from '../components/ApprovalPanel.jsx'
import PurchaseConfirmation from '../components/PurchaseConfirmation.jsx'
import AuditTrail from '../components/AuditTrail.jsx'
import NoFeasibleOption from '../components/NoFeasibleOption.jsx'
import GlassPanel from '../components/GlassPanel.jsx'
import { emptyBuyingRequest, hardConstraintFields } from '../data/buyingRequestData.js'
import { runProcurementPipeline, createAuditEvent } from '../utils/procurementEngine.js'
import { WORKFLOW_STATES } from '../data/workflowStates.js'
import { useProcurement } from '../context/ProcurementContext.jsx'

function isFieldSatisfied(request, key) {
  const value = request[key]
  if (key === 'specifications') return value.length > 0
  return String(value ?? '').trim().length > 0
}

function BuyingRequestPage() {
  const { recordEvent } = useProcurement()
  const [brief, setBrief] = useState('')
  const [request, setRequest] = useState(emptyBuyingRequest)

  const [isDiscovering, setIsDiscovering] = useState(false)
  const [pipelineResult, setPipelineResult] = useState(null)
  const [auditTrail, setAuditTrail] = useState([])
  const [isApproved, setIsApproved] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)
  const [confirmationId, setConfirmationId] = useState(null)

  const totalBudget = useMemo(() => {
    const quantity = Number(request.quantity) || 0
    const budgetPerUnit = Number(request.budgetPerUnit) || 0
    return quantity * budgetPerUnit
  }, [request.quantity, request.budgetPerUnit])

  const isRequestReady = hardConstraintFields.every((field) => isFieldSatisfied(request, field.key))

  function resetPipelineState() {
    setPipelineResult(null)
    setAuditTrail([])
    setIsApproved(false)
    setIsPurchased(false)
    setConfirmationId(null)
  }

  function handleFieldChange(key, value) {
    setRequest((prev) => ({ ...prev, [key]: value }))
    resetPipelineState()
  }

  function handlePreferenceChange(key, value) {
    setRequest((prev) => ({ ...prev, preferences: { ...prev.preferences, [key]: value } }))
  }

  function handleLoadScenario(scenario) {
    setBrief(scenario.brief)
    setRequest(scenario.request)
    resetPipelineState()
  }

  // Parse the freeform brief and populate structured fields when possible
  function handleParseBrief() {
    // lazy-load parser to keep file small and focused
    import('../utils/briefParser.js').then(({ parseBrief }) => {
      const parsed = parseBrief(brief || '')
      if (!parsed) return

      // Apply detected fields using existing handlers so pipeline state is reset
      if (parsed.item) handleFieldChange('item', parsed.item)
      if (parsed.quantity) handleFieldChange('quantity', String(parsed.quantity))
      if (parsed.budgetPerUnit) handleFieldChange('budgetPerUnit', String(parsed.budgetPerUnit))
      if (parsed.deliveryTimeline) handleFieldChange('deliveryTimeline', parsed.deliveryTimeline)
      if (parsed.specifications && parsed.specifications.length) handleFieldChange('specifications', parsed.specifications)

      // Soft preferences
      if (parsed.preferences) {
        Object.entries(parsed.preferences).forEach(([k, v]) => {
          if (!v) return
          // map parser preference keys to existing soft preference keys if they match
          if (k === 'brand' && v) handlePreferenceChange('brand', v)
          if (k === 'vendor' && v) handlePreferenceChange('vendor', v)
          if (k === 'warranty' && v) handlePreferenceChange('warranty', v)
          if (k === 'deliveryDate' && v) handlePreferenceChange('deliveryDate', v)
        })
      }
    })
  }

  function handleRunDiscovery() {
    setIsDiscovering(true)
    // Small simulated delay so the Discovering/Evaluating states are
    // visible in the UI — the pipeline itself is fully deterministic.
    setTimeout(() => {
      const result = runProcurementPipeline(request)
      setPipelineResult(result)
      setAuditTrail(result.auditTrail)
      setIsDiscovering(false)

      recordEvent('request_run', `${request.item || 'Request'} — ${result.state}`)
      if (result.state === WORKFLOW_STATES.NO_FEASIBLE_OPTION) {
        recordEvent('no_feasible', `${request.item || 'Request'} — no feasible option`)
      } else if (result.state === WORKFLOW_STATES.PENDING_APPROVAL) {
        recordEvent('pending_approval', `${request.item || 'Request'} — approval required`)
      }
    }, 500)
  }

  function handleApprove() {
    setIsApproved(true)
    setAuditTrail((prev) => [
      ...prev,
      createAuditEvent('Human approval', 'Purchase approved by human reviewer.'),
    ])
    recordEvent('approved', `${request.item || 'Request'} — approved by reviewer`)
  }

  function handleConfirmPurchase() {
    const id = `PO-${Date.now().toString().slice(-8)}`
    setConfirmationId(id)
    setIsPurchased(true)
    setAuditTrail((prev) => [
      ...prev,
      createAuditEvent(
        'Purchase confirmed',
        `Simulated purchase confirmed. Confirmation ID ${id}. No real order was placed.`,
      ),
    ])
    recordEvent('purchased', `${request.item || 'Request'} — purchase confirmed (${id})`)
  }

  const currentState = isDiscovering
    ? WORKFLOW_STATES.DISCOVERING
    : !pipelineResult
      ? WORKFLOW_STATES.DRAFT
      : pipelineResult.state === WORKFLOW_STATES.NO_FEASIBLE_OPTION
        ? WORKFLOW_STATES.NO_FEASIBLE_OPTION
        : isPurchased
          ? WORKFLOW_STATES.COMPLETED
          : isApproved || pipelineResult.state === WORKFLOW_STATES.READY_TO_PURCHASE
            ? WORKFLOW_STATES.READY_TO_PURCHASE
            : WORKFLOW_STATES.PENDING_APPROVAL

  const canPurchase =
    pipelineResult?.recommendation &&
    (pipelineResult.authorization?.withinLimit || isApproved)

  return (
    <div className="flex flex-col gap-6">
      <GlassPanel className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Workflow State
          </p>
          <p className="mt-0.5 text-sm text-slate-400">
            Buying Brief → Discovery → Evaluation → Ranking → Authorization → Approval → Purchase
          </p>
        </div>
        <WorkflowStateBadge state={currentState} />
      </GlassPanel>

      <ExampleRequests onLoadScenario={handleLoadScenario} />

      <BuyingBriefInput value={brief} onChange={setBrief} onParse={handleParseBrief} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ConstraintForm
            request={request}
            totalBudget={totalBudget}
            onFieldChange={handleFieldChange}
            onPreferenceChange={handlePreferenceChange}
          />
        </div>

        <div className="flex flex-col gap-6">
          <AuthorizationLimitCard
            authorizationLimit={request.authorizationLimit}
            budgetPerUnit={request.budgetPerUnit}
            quantity={request.quantity}
          />
          <RequestSummary request={request} />
        </div>
      </div>

      <ValidationSummary request={request} />

      <GlassPanel className="flex flex-col items-start justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-base font-semibold text-white">
            Run Vendor Discovery
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Searches both simulated sources, evaluates constraints, ranks eligible offers, and
            checks the authorization limit.
          </p>
        </div>
        <button
          type="button"
          disabled={!isRequestReady || isDiscovering}
          onClick={handleRunDiscovery}
          className="shrink-0 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            background: 'linear-gradient(135deg, var(--color-indigo), var(--color-accent))',
            boxShadow: '0 6px 24px rgba(99, 102, 241, 0.35)',
          }}
        >
          {isDiscovering ? 'Discovering…' : 'Run Discovery & Evaluate'}
        </button>
      </GlassPanel>

      {pipelineResult && pipelineResult.state === WORKFLOW_STATES.NO_FEASIBLE_OPTION && (
        <NoFeasibleOption discovery={pipelineResult.discovery} evaluation={pipelineResult.evaluation} />
      )}

      {pipelineResult && pipelineResult.evaluation && (
        <>
          <DiscoverySummary discovery={pipelineResult.discovery} evaluation={pipelineResult.evaluation} />
          <OfferList
            sources={pipelineResult.discovery.sources}
            evaluatedOffers={pipelineResult.evaluation.evaluated}
          />
        </>
      )}

      {pipelineResult?.recommendation && (
        <RankingExplainCard
          recommendation={pipelineResult.recommendation}
          rankedCount={pipelineResult.ranked.length}
        />
      )}

      {pipelineResult?.authorization && (
        <ApprovalPanel
          authorization={pipelineResult.authorization}
          isApproved={isApproved}
          onApprove={handleApprove}
        />
      )}

      {canPurchase && (
        <PurchaseConfirmation
          recommendation={pipelineResult.recommendation}
          request={request}
          isPurchased={isPurchased}
          confirmationId={confirmationId}
          onConfirm={handleConfirmPurchase}
        />
      )}

      {auditTrail.length > 0 && <AuditTrail events={auditTrail} />}
    </div>
  )
}

export default BuyingRequestPage
