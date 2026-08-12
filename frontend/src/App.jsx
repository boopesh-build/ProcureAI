import GlassPanel from './components/GlassPanel.jsx'
import StatusBadge from './components/StatusBadge.jsx'

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <GlassPanel className="w-full max-w-md px-10 py-12 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          ProcureAI
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Autonomous Procurement Agent
        </p>

        <div className="mt-8 flex justify-center">
          <StatusBadge label="System Ready" />
        </div>
      </GlassPanel>
    </div>
  )
}

export default App
