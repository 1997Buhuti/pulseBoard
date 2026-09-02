import { AlertCircle, CheckCircle2, Clock3, Users } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PageHeading } from '@/components/shared/PageHeading'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { TEAM_MEMBERS } from '@/lib/mock-data'
import { ReportStatus } from '@/types/enums'

export function ManagerReviewPanel() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Manager workspace"
        title="Review queue"
        description="Keep submissions moving with focused feedback and clear next steps."
        action={
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/team" />}
          >
            <Users data-icon="inline-start" />
            View team
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Awaiting review" value="8" icon={Clock3} />
        <StatCard label="Needs correction" value="6" icon={AlertCircle} />
        <StatCard label="Approved this week" value="28" icon={CheckCircle2} />
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">
            Reports awaiting your review
          </CardTitle>
          <CardDescription>
            Prioritized by submission date and status.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {TEAM_MEMBERS.slice(0, 4).map((member, index) => (
            <div
              key={member.id}
              className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
            >
              <Avatar className="size-10">
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">
                  {index === 1
                    ? 'May 13 – May 19 · Product Design'
                    : 'May 20 – May 26 · Website Redesign'}
                </p>
              </div>
              <StatusBadge
                status={
                  index === 1
                    ? ReportStatus.NEEDS_CORRECTION
                    : ReportStatus.SUBMITTED
                }
              />
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/reports/rpt-1" />}
              >
                Review report
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
