// Static demo data only. No real procurement calculations or live data.

export const metrics = [
  { id: 'active-requests', label: 'Active Requests', value: 12 },
  { id: 'feasible-offers', label: 'Feasible Offers', value: 34 },
  { id: 'pending-approvals', label: 'Pending Approvals', value: 3 },
  { id: 'active-risks', label: 'Active Risks', value: 2 },
]

export const pipelineStages = [
  { id: 'request', label: 'Request', status: 'complete' },
  { id: 'requirements', label: 'Requirements', status: 'complete' },
  { id: 'offers', label: 'Offers', status: 'complete' },
  { id: 'validation', label: 'Validation', status: 'in-progress' },
  { id: 'ranking', label: 'Ranking', status: 'pending' },
  { id: 'approval', label: 'Approval', status: 'pending' },
]

export const recentRequests = [
  {
    id: 'req-1',
    name: 'Laptop Procurement',
    quantity: 10,
    budget: '₹45,000/unit',
    status: 'review',
    updated: '2 min ago',
  },
  {
    id: 'req-2',
    name: 'Industrial Sensors',
    quantity: 25,
    budget: '₹8,500/unit',
    status: 'approved',
    updated: '18 min ago',
  },
  {
    id: 'req-3',
    name: 'CNC Components',
    quantity: 50,
    budget: '₹2,500/unit',
    status: 'risk',
    updated: '42 min ago',
  },
]

export const risks = [
  {
    id: 'risk-1',
    title: 'Budget Risk',
    severity: 'medium',
    detail: '₹2,500 over target',
  },
  {
    id: 'risk-2',
    title: 'Delivery Risk',
    severity: 'high',
    detail: '2 days beyond deadline',
  },
  {
    id: 'risk-3',
    title: 'Evidence Risk',
    severity: 'low',
    detail: 'Vendor reliability requires verification',
  },
]

export const recommendation = {
  action: 'Proceed to human approval',
  reason:
    '3 feasible offers identified. Vendor A currently provides the strongest specification fit and delivery profile.',
}

export const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'buying-request', label: 'Buying Request' },
  { id: 'vendor-discovery', label: 'Vendor Discovery' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'risk-center', label: 'Risk Center' },
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'purchase-simulation', label: 'Purchase Simulation' },
  { id: 'human-approval', label: 'Human Approval' },
  { id: 'audit-trail', label: 'Audit Trail' },
]
