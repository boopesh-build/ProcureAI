// Frontend data model for a buying request (PS1 Requirement #1/#2).
// Kept simple and flat so it can map directly onto a future backend payload.
//
// {
//   item, quantity, budgetPerUnit, specifications, deliveryTimeline,
//   authorizationLimit, department, purpose,
//   preferences: { brand, vendor, warranty, deliveryDate }
// }
//
// Note on authorizationLimit: this is a TOTAL purchase-value threshold —
// totalPurchaseValue = recommendedOffer.price × quantity. If that total
// exceeds authorizationLimit, the agent stops and requires human approval
// before a purchase can be simulated.

export const emptyBuyingRequest = {
  item: '',
  quantity: '',
  budgetPerUnit: '',
  specifications: [],
  deliveryTimeline: '',
  authorizationLimit: '',
  department: '',
  purpose: '',
  preferences: {
    brand: '',
    vendor: '',
    warranty: '',
    deliveryDate: '',
  },
}

// Fields the agent treats as hard constraints — must be satisfied.
export const hardConstraintFields = [
  { key: 'item', label: 'Product / Item', type: 'text' },
  { key: 'quantity', label: 'Quantity', type: 'number' },
  { key: 'budgetPerUnit', label: 'Budget per Unit (₹)', type: 'number' },
  { key: 'specifications', label: 'Specifications', type: 'chips' },
  { key: 'deliveryTimeline', label: 'Delivery Timeline', type: 'text' },
  { key: 'authorizationLimit', label: 'Authorization Limit (₹ total)', type: 'number' },
]

// Optional context fields — never block validation, shown as Provided/Missing.
export const optionalContextFields = [
  { key: 'department', label: 'Department' },
  { key: 'purpose', label: 'Purpose' },
]

// Fields treated as soft preferences — nice-to-have, don't block validation.
export const softPreferenceFields = [
  { key: 'brand', label: 'Preferred Brand' },
  { key: 'vendor', label: 'Preferred Vendor' },
  { key: 'warranty', label: 'Warranty Preference' },
  { key: 'deliveryDate', label: 'Preferred Delivery Date' },
]

// Human-readable message shown when a hard constraint is missing.
export const missingFieldMessages = {
  item: 'Product / item is required before vendor discovery.',
  quantity: 'Quantity is required before vendor discovery.',
  budgetPerUnit: 'Budget per unit is required before vendor discovery.',
  specifications: 'At least one specification is required before vendor discovery.',
  deliveryTimeline: 'Delivery timeline is required before vendor discovery.',
  authorizationLimit: 'Authorization limit is required before vendor discovery.',
}

export const sampleScenarios = [
  {
    id: 'office-chairs',
    label: 'Load Office Chairs Example',
    // Demonstrates: successful purchase, fully auto-authorized.
    brief:
      'I need 15 ergonomic office chairs for the new floor. Budget is ₹12,000 per unit. Require adjustable lumbar support and armrests, delivery within 10 days. Purchases above ₹2,00,000 require manager approval.',
    request: {
      item: 'Office Chair',
      quantity: '15',
      budgetPerUnit: '12000',
      specifications: ['Ergonomic', 'Adjustable lumbar support', 'Armrests'],
      deliveryTimeline: 'Within 10 days',
      authorizationLimit: '200000',
      department: '',
      purpose: '',
      preferences: {
        brand: '',
        vendor: '',
        warranty: '1 year preferred',
        deliveryDate: '',
      },
    },
  },
  {
    id: 'laptop-stands',
    label: 'Load Laptop Stands Example',
    brief:
      'I need 20 aluminium laptop stands for the engineering team. Budget is ₹1,500 per unit. Require adjustable height and foldable design, delivery within 5 days. Purchases above ₹35,000 require manager approval.',
    request: {
      item: 'Laptop Stand',
      quantity: '20',
      budgetPerUnit: '1500',
      specifications: ['Aluminium', 'Adjustable height', 'Foldable'],
      deliveryTimeline: 'Within 5 days',
      authorizationLimit: '35000',
      department: '',
      purpose: '',
      preferences: {
        brand: '',
        vendor: '',
        warranty: '',
        deliveryDate: '',
      },
    },
  },
  {
    id: 'external-monitor',
    label: 'Load Monitor Example',
    // Demonstrates: top-ranked vendor unavailable → automatic fallback,
    // still ends in a successful, auto-authorized purchase.
    brief:
      'I need 8 external monitors for new joiners. Budget is ₹20,000 per unit. Require 27-inch 4K displays with USB-C and delivery within 7 days. Purchases above ₹1,70,000 require manager approval.',
    request: {
      item: 'External Monitor',
      quantity: '8',
      budgetPerUnit: '20000',
      specifications: ['27-inch', '4K', 'USB-C'],
      deliveryTimeline: 'Within 7 days',
      authorizationLimit: '170000',
      department: '',
      purpose: '',
      preferences: {
        brand: '',
        vendor: '',
        warranty: '',
        deliveryDate: '',
      },
    },
  },
  {
    id: 'safety-helmets',
    label: 'Load Safety Helmets Example',
    // Demonstrates: approval-required (total purchase value exceeds limit).
    brief:
      'I need 25 industrial safety helmets for the manufacturing team. Budget ₹75,000. Delivery required by September 15. The helmets must comply with industrial safety requirements. Purchases above ₹60,000 require manager approval.',
    request: {
      item: 'Industrial Safety Helmet',
      quantity: '25',
      budgetPerUnit: '3000',
      specifications: ['Industrial safety compliant'],
      deliveryTimeline: 'By September 15, 2026',
      authorizationLimit: '60000',
      department: 'Manufacturing',
      purpose: 'Team safety equipment replenishment',
      preferences: {
        brand: '',
        vendor: '',
        warranty: 'ISI/BIS certified preferred',
        deliveryDate: '',
      },
    },
  },
  {
    id: 'no-feasible-option',
    label: 'Load No Feasible Option Example',
    // Demonstrates: item outside the prototype catalog — 0 offers found
    // from either source, workflow stops at NO_FEASIBLE_OPTION.
    brief:
      'I need 5 electric standing desk converters for the design team. Budget ₹8,000 per unit. Require electric height adjustment, delivery within 5 days.',
    request: {
      item: 'Standing Desk Converter',
      quantity: '5',
      budgetPerUnit: '8000',
      specifications: ['Electric height adjustment'],
      deliveryTimeline: 'Within 5 days',
      authorizationLimit: '40000',
      department: '',
      purpose: '',
      preferences: {
        brand: '',
        vendor: '',
        warranty: '',
        deliveryDate: '',
      },
    },
  },
]
