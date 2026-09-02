'use client'

import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FieldCard } from '@/components/shared/FieldCard'
import { PageHeading } from '@/components/shared/PageHeading'
import { REPORTS, TASKS } from '@/lib/mock-data'
import { ReportStatus, TaskPriority, TaskStatus } from '@/types/enums'
import type { IWeeklyReport } from '@/types'

interface IReportDetailViewProps {
  reportId: string
}

function resolveReport(reportId: string): IWeeklyReport {
  return REPORTS.find((report) => report.id === reportId) ?? REPORTS[0]
}

export function ReportDetailView({ reportId }: IReportDetailViewProps) {
  const report = resolveReport(reportId)
  const showFeedback = report.status === ReportStatus.NEEDS_CORRECTION

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Weekly report"
        title={report.range}
        description="Capture the work you completed and share what is next."
        action={
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/reports" />}
          >
            Back to reports
          </Button>
        }
      />

      {showFeedback && (
        <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-accent-foreground" />
          <div>
            <p className="font-medium text-accent-foreground">
              Manager feedback
            </p>
            <p className="mt-1 leading-6 text-accent-foreground/80">
              Please add more detail to the output for the onboarding flow and
              clarify the time spent.
            </p>
          </div>
        </div>
      )}

      <Card className="shadow-none">
        <CardHeader className="flex-col gap-4 border-b sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CardTitle className="text-base">Report details</CardTitle>
            <CardDescription>
              Set the reporting period and project category.
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1.5 sm:w-48">
            <label className="text-xs font-medium text-muted-foreground">
              Project category
            </label>
            <Select defaultValue={report.project}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Product Design">Product Design</SelectItem>
                <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                <SelectItem value="Internal Operations">
                  Internal Operations
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3">Task name</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Planned vs actual</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Time spent</th>
                  <th className="px-5 py-3">Output</th>
                </tr>
              </thead>
              <tbody>
                {TASKS.map((task) => (
                  <tr key={task.name} className="border-b last:border-0">
                    <td className="px-5 py-4 font-medium">{task.name}</td>
                    <td className="px-4 py-4">
                      <Badge
                        variant="outline"
                        className={
                          task.priority === TaskPriority.HIGH
                            ? 'border-accent/40 bg-accent/15 text-accent-foreground'
                            : 'border-primary/25 bg-primary/10 text-primary'
                        }
                      >
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="min-w-44 px-4 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>Planned {task.planned}%</span>
                          <span>Actual {task.actual}%</span>
                        </div>
                        <Progress value={task.actual} />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Select defaultValue={task.status}>
                        <SelectTrigger className="h-8 w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={TaskStatus.COMPLETED}>
                            {TaskStatus.COMPLETED}
                          </SelectItem>
                          <SelectItem value={TaskStatus.IN_PROGRESS}>
                            {TaskStatus.IN_PROGRESS}
                          </SelectItem>
                          <SelectItem value={TaskStatus.BLOCKED}>
                            {TaskStatus.BLOCKED}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                      {task.time}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {task.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <FieldCard
          label="Tasks planned for next week"
          placeholder="Outline the key tasks you plan to focus on..."
        />
        <FieldCard
          label="Blockers / Challenges"
          placeholder="Share any blockers or support you need..."
          checkbox="Flag as key issue"
        />
        <FieldCard
          label="Achievements"
          placeholder="Highlight meaningful outcomes from this week..."
          checkbox="Flag as key achievement"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button variant="outline">Save draft</Button>
        <Button>Submit for review</Button>
      </div>
    </div>
  )
}
