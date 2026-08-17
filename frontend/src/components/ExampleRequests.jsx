import GlassPanel from './GlassPanel.jsx'
import { sampleScenarios } from '../data/buyingRequestData.js'

function ExampleRequests({ onLoadScenario }) {
  return (
    <GlassPanel className="px-6 py-6">
      <h2 className="font-display text-base font-semibold text-white">Try an Example</h2>
      <p className="mt-1 text-sm text-slate-500">
        Load a sample buying brief to see how the structured constraints populate.
      </p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {sampleScenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => onLoadScenario(scenario)}
            className="rounded-lg border border-[var(--color-glass-border)] bg-[rgba(20,23,55,0.3)] px-3.5 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-indigo/40 hover:bg-[rgba(99,102,241,0.12)] hover:text-white"
          >
            {scenario.label}
          </button>
        ))}
      </div>
    </GlassPanel>
  )
}

export default ExampleRequests