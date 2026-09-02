import { DashboardCharts } from '@/components/features/dashboard/DashboardCharts'
import { DashboardMetrics } from '@/components/features/dashboard/DashboardMetrics'

export default function DashboardPage() {
  return (
    <>
      <DashboardMetrics />
      <DashboardCharts />
    </>
  )
}
