import DashboardLayout from './components/DashboardLayout.jsx'
import MetricCard from './components/MetricCard.jsx'
import ProcurementPipeline from './components/ProcurementPipeline.jsx'
import RecentRequests from './components/RecentRequests.jsx'
import RiskSummary from './components/RiskSummary.jsx'
import RecommendationCard from './components/RecommendationCard.jsx'
import { metrics } from './data/mockData.js'

function App() {
  return (
    <DashboardLayout>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} label={metric.label} value={metric.value} />
        ))}
      </section>

      <ProcurementPipeline />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentRequests />
        </div>
        <RiskSummary />
      </section>

      <RecommendationCard />
    </DashboardLayout>
  )
}

export default App
