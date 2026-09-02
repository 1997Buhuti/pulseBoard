'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, Plus, Search } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeading } from '@/components/shared/PageHeading'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { REPORTS } from '@/lib/mock-data'
import { ReportStatus } from '@/types/enums'

const ALL_STATUSES = 'All statuses'

export function ReportHistoryTable() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState(ALL_STATUSES)

  const filtered = useMemo(
    () =>
      REPORTS.filter(
        (report) =>
          (status === ALL_STATUSES || report.status === status) &&
          `${report.range} ${report.project} ${report.status}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, status],
  )

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Team member workspace"
        title="Your reports"
        description="Review past reports or create a new weekly update."
        action={
          <Button nativeButton={false} render={<Link href="/reports/create" />}>
            <Plus data-icon="inline-start" />
            New report
          </Button>
        }
      />

      <div className="flex gap-1 border-b">
        <span className="border-b-2 border-primary px-3 py-2 text-sm font-medium text-primary">
          Report history
        </span>
        <Link
          href="/reviews"
          className="px-3 py-2 text-sm text-muted-foreground"
        >
          Review feedback
        </Link>
      </div>

      <Card className="shadow-none">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-end">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <label
              htmlFor="search-reports"
              className="text-xs font-medium text-muted-foreground"
            >
              Search reports
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="search-reports"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by project or date"
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-1.5 sm:w-52">
            <label className="text-xs font-medium text-muted-foreground">
              Filter by status
            </label>
            <Select
              value={status}
              onValueChange={(value) => {
                if (typeof value === 'string') setStatus(value)
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_STATUSES}>{ALL_STATUSES}</SelectItem>
                <SelectItem value={ReportStatus.DRAFT}>
                  {ReportStatus.DRAFT}
                </SelectItem>
                <SelectItem value={ReportStatus.SUBMITTED}>
                  {ReportStatus.SUBMITTED}
                </SelectItem>
                <SelectItem value={ReportStatus.NEEDS_CORRECTION}>
                  {ReportStatus.NEEDS_CORRECTION}
                </SelectItem>
                <SelectItem value={ReportStatus.APPROVED}>
                  {ReportStatus.APPROVED}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Report history</CardTitle>
          <CardDescription>
            {filtered.length} {filtered.length === 1 ? 'report' : 'reports'}{' '}
            found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-y bg-muted/40 text-left text-xs font-medium text-muted-foreground">
                  <th className="px-6 py-3">Week date range</th>
                  <th className="px-4 py-3">Project tag</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-medium">
                        <CalendarDays
                          className="size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {report.range}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary">{report.project}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        nativeButton={false}
                        render={<Link href={`/reports/${report.id}`} />}
                      >
                        View/Edit
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-muted-foreground"
                    >
                      No reports match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
