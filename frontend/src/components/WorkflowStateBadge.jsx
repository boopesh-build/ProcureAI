import StatusBadge from './StatusBadge.jsx'
import { workflowStateMeta } from '../data/workflowStates.js'

function WorkflowStateBadge({ state }) {
  const meta = workflowStateMeta[state] || { label: state, tone: 'neutral' }
  return <StatusBadge label={meta.label.toUpperCase()} tone={meta.tone} variant="pill" />
}

export default WorkflowStateBadge
