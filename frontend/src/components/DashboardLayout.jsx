import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-base text-slate-200">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
