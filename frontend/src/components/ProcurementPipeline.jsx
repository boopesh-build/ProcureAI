import GlassPanel from './GlassPanel.jsx'
import StatusBadge from './StatusBadge.jsx'
import { pipelineStages } from '../data/mockData.js'
import { pipelineStatusMap } from '../data/statusMaps.js'

const NODE_STYLES = {
  complete: 'border-success bg-success/20 text-success',
  'in-progress': 'border-accent bg-accent/20 text-accent',
  pending: 'border-white/15 bg-white/[0.03] text-slate-500',
}

const CONNECTOR_STYLES = {
  complete: 'bg-success/40',
  'in-progress': 'bg-accent/40',
  pending: 'bg-white/10',
}

function ProcurementPipeline() {
  return (
    <GlassPanel className="px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-white">
          Procurement Overview
        </h2>
        <p className="text-xs text-slate-500">Request #PR-2026-0412</p>
      </div>

      <ol className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-0">
        {pipelineStages.map((stage, index) => {
          const meta = pipelineStatusMap[stage.status]
          const isLast = index === pipelineStages.length - 1
          return (
            <li key={stage.id} className="flex flex-1 items-start sm:flex-col">
              <div className="flex items-center sm:w-full">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold tabular ${NODE_STYLES[stage.status]}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                {!isLast && (
                  <span
                    className={`hidden h-0.5 flex-1 sm:block ${CONNECTOR_STYLES[stage.status]}`}
                  />
                )}
              </div>

              <div className="ml-4 sm:ml-0 sm:mt-3">
                <p className="text-sm font-medium text-slate-200">{stage.label}</p>
                <div className="mt-1.5">
                  <StatusBadge label={meta.label} tone={meta.tone} variant="pill" />
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </GlassPanel>
  )
}

export default ProcurementPipeline
