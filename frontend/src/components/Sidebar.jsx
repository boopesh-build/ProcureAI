import { navItems } from '../data/mockData.js'
import StatusBadge from './StatusBadge.jsx'

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/[0.06] bg-surface/80 backdrop-blur-xl">
      <div className="px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 font-display text-sm font-semibold text-accent">
            P
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            ProcureAI
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.id === 'dashboard'
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'border border-accent/20 bg-accent/10 text-white'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="space-y-3 border-t border-white/[0.06] px-4 py-5">
        <StatusBadge label="System Ready" tone="success" />
        <button
          type="button"
          className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-500 transition-colors hover:bg-white/[0.04] hover:text-slate-300"
        >
          Settings
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
