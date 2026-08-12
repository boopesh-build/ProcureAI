export const requestStatusMap = {
  review: { label: 'In Review', tone: 'accent' },
  approved: { label: 'Approved', tone: 'success' },
  risk: { label: 'Risk', tone: 'danger' },
}

export const riskSeverityMap = {
  high: { label: 'High', tone: 'danger' },
  medium: { label: 'Medium', tone: 'warning' },
  low: { label: 'Low', tone: 'neutral' },
}

export const pipelineStatusMap = {
  complete: { label: 'Complete', tone: 'success' },
  'in-progress': { label: 'In Progress', tone: 'accent' },
  pending: { label: 'Pending', tone: 'neutral' },
}
