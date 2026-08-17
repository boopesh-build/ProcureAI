import { useState } from 'react'
import DashboardLayout from './components/DashboardLayout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import BuyingRequestPage from './pages/BuyingRequestPage.jsx'
import { ProcurementProvider } from './context/ProcurementContext.jsx'

// No router yet — a simple page-id switch is the smallest change that
// gets the sidebar navigating between the two implemented pages.
const PAGES = {
  dashboard: {
    title: 'Dashboard',
    description: 'Procurement control center — live overview of active requests, offers, and risk.',
    Component: DashboardPage,
  },
  'buying-request': {
    title: 'Buying Request',
    description: 'Submit a natural-language buying brief and define request constraints.',
    Component: BuyingRequestPage,
  },
}

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const { title, description, Component } = PAGES[activePage]

  return (
    <ProcurementProvider>
      <DashboardLayout
        activePage={activePage}
        onNavigate={setActivePage}
        title={title}
        description={description}
      >
        <Component />
      </DashboardLayout>
    </ProcurementProvider>
  )
}

export default App
