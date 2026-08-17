import { createContext, useContext, useMemo, useState } from 'react'

const ProcurementContext = createContext(null)

const initialCounts = {
  activeRequests: 0,
  awaitingApproval: 0,
  completedPurchases: 0,
  risksExceptions: 0,
}

export function ProcurementProvider({ children }) {
  const [counts, setCounts] = useState(initialCounts)
  const [activity, setActivity] = useState([])

  function recordEvent(type, label) {
    setCounts((prev) => {
      switch (type) {
        case 'request_run':
          return { ...prev, activeRequests: prev.activeRequests + 1 }
        case 'pending_approval':
          return { ...prev, awaitingApproval: prev.awaitingApproval + 1 }
        case 'approved':
          return { ...prev, awaitingApproval: Math.max(0, prev.awaitingApproval - 1) }
        case 'purchased':
          return { ...prev, completedPurchases: prev.completedPurchases + 1 }
        case 'no_feasible':
          return { ...prev, risksExceptions: prev.risksExceptions + 1 }
        default:
          return prev
      }
    })
    setActivity((prev) =>
      [{ id: `activity-${prev.length + 1}`, type, label, time: new Date().toISOString() }, ...prev].slice(
        0,
        8,
      ),
    )
  }

  const value = useMemo(() => ({ counts, activity, recordEvent }), [counts, activity])

  return <ProcurementContext.Provider value={value}>{children}</ProcurementContext.Provider>
}

export function useProcurement() {
  const ctx = useContext(ProcurementContext)
  if (!ctx) {
    throw new Error('useProcurement must be used within a ProcurementProvider')
  }
  return ctx
}
