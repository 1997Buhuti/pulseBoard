import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeading } from '@/components/shared/PageHeading'
import { DASHBOARD_METRICS } from '@/lib/mock-data'
import type { IDashboardMetric } from '@/types'

const METRIC_ICONS = {
  FileText,
  CheckCircle2,
  AlertCircle,
  Activity,
} as const

function MetricCard({ metric }: { metric: IDashboardMetric }) {
  const Icon = METRIC_ICONS[metric.iconName]

  return (
    <Card className="shadow-none">
      <CardContent className="flex items-start justify-between p-5">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <p className="text-3xl font-semibold tracking-tight">{metric.value}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span
              className={
                metric.direction === 'down' ? 'text-chart-2' : 'text-primary'
              }
            >
              {metric.direction === 'down' ? (
                <ArrowDownRight className="inline size-3" />
              ) : (
                <ArrowUpRight className="inline size-3" />
              )}
              {metric.change}
            </span>{' '}
            vs last week
          </div>
        </div>
        <div className="rounded-lg bg-muted p-2.5 text-muted-foreground">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardMetrics() {
  return (
    <>
      <PageHeading
        eyebrow="Team member workspace"
        title="Good morning, Jamie"
        description="Here is how your team is tracking this week."
        action={
          <Button nativeButton={false} render={<Link href="/reports/create" />}>
            <Plus data-icon="inline-start" />
            New weekly report
          </Button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </>
  )
}
