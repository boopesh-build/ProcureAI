import ConstraintSection from './ConstraintSection.jsx'
import SpecificationChips from './SpecificationChips.jsx'
import { softPreferenceFields, optionalContextFields } from '../data/buyingRequestData.js'

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClasses =
  'w-full rounded-lg border border-[rgba(255,255,255,0.72)] bg-[rgba(255,255,255,0.52)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[rgba(91,104,117,0.5)] transition-all duration-200 focus:border-[rgba(0,184,200,0.9)] focus:shadow-[0_0_0_6px_rgba(0,184,200,0.12)] focus:outline-none backdrop-blur-sm'

function ConstraintForm({ request, totalBudget, onFieldChange, onPreferenceChange }) {
  return (
    <div className="space-y-4">
      <ConstraintSection
        kind="hard"
        title="Structured Constraints"
        description="Must be satisfied before vendor discovery can proceed."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Product / Item">
            <input
              type="text"
              value={request.item}
              onChange={(event) => onFieldChange('item', event.target.value)}
              placeholder="External Monitor"
              className={inputClasses}
            />
          </Field>

          <Field label="Quantity">
            <input
              type="number"
              min="0"
              value={request.quantity}
              onChange={(event) => onFieldChange('quantity', event.target.value)}
              placeholder="8"
              className={inputClasses}
            />
          </Field>

          <Field label="Budget per Unit (₹)">
            <input
              type="number"
              min="0"
              value={request.budgetPerUnit}
              onChange={(event) => onFieldChange('budgetPerUnit', event.target.value)}
              placeholder="20000"
              className={inputClasses}
            />
          </Field>

          <Field label="Total Budget (₹)">
            <div className={`${inputClasses} tabular text-[var(--color-text-primary)]`}>
              {totalBudget ? totalBudget.toLocaleString('en-IN') : '—'}
            </div>
          </Field>

          <Field label="Delivery Timeline">
            <input
              type="text"
              value={request.deliveryTimeline}
              onChange={(event) => onFieldChange('deliveryTimeline', event.target.value)}
              placeholder="Within 7 days"
              className={inputClasses}
            />
          </Field>

          <Field label="Authorization Limit (₹ / unit)">
            <input
              type="number"
              min="0"
              value={request.authorizationLimit}
              onChange={(event) => onFieldChange('authorizationLimit', event.target.value)}
              placeholder="20000"
              className={inputClasses}
            />
          </Field>
        </div>

        <Field label="Specifications">
          <SpecificationChips
            specifications={request.specifications}
            onChange={(specs) => onFieldChange('specifications', specs)}
          />
        </Field>
      </ConstraintSection>

      <ConstraintSection
        kind="soft"
        light={true}
        title="Additional Context"
        description="Optional — helpful for audit trail, does not block validation."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {optionalContextFields.map((field) => (
            <Field key={field.key} label={field.label}>
              <input
                type="text"
                value={request[field.key]}
                onChange={(event) => onFieldChange(field.key, event.target.value)}
                placeholder="Optional"
                className={inputClasses}
              />
            </Field>
          ))}
        </div>
      </ConstraintSection>

      <ConstraintSection
        kind="soft"
        light={true}
        title="Soft Preferences"
        description="Nice-to-have — do not block validation or vendor discovery."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {softPreferenceFields.map((field) => (
            <Field key={field.key} label={field.label}>
              <input
                type="text"
                value={request.preferences[field.key]}
                onChange={(event) => onPreferenceChange(field.key, event.target.value)}
                placeholder="Optional"
                className={inputClasses}
              />
            </Field>
          ))}
        </div>
      </ConstraintSection>
    </div>
  )
}

export default ConstraintForm
