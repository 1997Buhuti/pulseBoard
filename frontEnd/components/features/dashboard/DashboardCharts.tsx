import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  FileCheck2,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ACTIVITY,
  TASKS_TREND,
  WORKLOAD_BY_PROJECT,
} from '@/lib/mock-data'
import { ActivityTone } from '@/types/enums'
import type { IActivityItem } from '@/types'

const ACTIVITY_ICONS = {
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  Clock3,
} as const

function toneClass(tone: ActivityTone): string {
  if (tone === ActivityTone.PRIMARY) return 'bg-primary/10 text-primary'
  if (tone === ActivityTone.ACCENT) return 'bg-accent/15 text-accent-foreground'
  if (tone === ActivityTone.SUCCESS) return 'bg-chart-2/10 text-chart-2'
  return 'bg-muted text-muted-foreground'
}

function ActivityRow({ item }: { item: IActivityItem }) {
  const Icon = ACTIVITY_ICONS[item.iconName]

  return (
    <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50">
      <div className={`mt-0.5 rounded-full p-2 ${toneClass(item.tone)}`}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{item.title}</p>
        <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
      </div>
      <time className="shrink-0 text-xs text-muted-foreground">{item.time}</time>
    </div>
  )
}

export function DashboardCharts() {
  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Tasks completed trend</CardTitle>
            <CardDescription>Across your team · Last 6 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-56 items-end gap-3 border-b border-l px-3 pb-0 pt-8 sm:gap-6">
              {TASKS_TREND.map((height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 flex-col justify-end gap-2"
                >
                  <div
                    className="rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-center text-[11px] text-muted-foreground">
                    W{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Workload by project</CardTitle>
            <CardDescription>Current team allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div
                className="relative flex size-36 shrink-0 items-center justify-center rounded-full"
                style={{
                  background:
                    'conic-gradient(var(--primary) 0 46%, var(--chart-2) 46% 76%, var(--accent) 76% 100%)',
                }}
              >
                <div className="flex size-20 items-center justify-center rounded-full bg-card text-center">
                  <span className="text-xs text-muted-foreground">
                    Total
                    <br />
                    <strong className="text-lg text-foreground">100%</strong>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                {WORKLOAD_BY_PROJECT.map(({ name, percentage, color }) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${color}`} />
                    <span className="text-muted-foreground">{name}</span>
                    <span className="ml-auto font-medium">{percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <CardDescription>
              Latest submissions and review actions
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/reports" />}
          >
            View all
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {ACTIVITY.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </CardContent>
      </Card>
    </>
  )
}
