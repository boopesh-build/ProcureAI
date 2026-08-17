// Explicit workflow states the pipeline can be in. Kept as a flat map so
// UI components can look up a label/tone without re-deriving logic.

export const WORKFLOW_STATES = {
  DRAFT: 'draft',
  ANALYZING: 'analyzing',
  DISCOVERING: 'discovering',
  EVALUATING: 'evaluating',
  NEEDS_INFORMATION: 'needs-information',
  NO_FEASIBLE_OPTION: 'no-feasible-option',
  PENDING_APPROVAL: 'pending-approval',
  APPROVED: 'approved',
  READY_TO_PURCHASE: 'ready-to-purchase',
  PURCHASED: 'purchased',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
}

export const workflowStateMeta = {
  [WORKFLOW_STATES.DRAFT]: { label: 'Draft', tone: 'neutral' },
  [WORKFLOW_STATES.ANALYZING]: { label: 'Analyzing', tone: 'accent' },
  [WORKFLOW_STATES.DISCOVERING]: { label: 'Discovering', tone: 'accent' },
  [WORKFLOW_STATES.EVALUATING]: { label: 'Evaluating', tone: 'accent' },
  [WORKFLOW_STATES.NEEDS_INFORMATION]: { label: 'Needs Information', tone: 'warning' },
  [WORKFLOW_STATES.NO_FEASIBLE_OPTION]: { label: 'No Feasible Option', tone: 'danger' },
  [WORKFLOW_STATES.PENDING_APPROVAL]: { label: 'Pending Approval', tone: 'warning' },
  [WORKFLOW_STATES.APPROVED]: { label: 'Approved', tone: 'success' },
  [WORKFLOW_STATES.READY_TO_PURCHASE]: { label: 'Ready to Purchase', tone: 'success' },
  [WORKFLOW_STATES.PURCHASED]: { label: 'Purchased', tone: 'success' },
  [WORKFLOW_STATES.COMPLETED]: { label: 'Completed', tone: 'success' },
  [WORKFLOW_STATES.REJECTED]: { label: 'Rejected', tone: 'danger' },
}
