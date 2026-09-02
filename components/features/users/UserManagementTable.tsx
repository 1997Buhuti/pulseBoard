import { AlertCircle, BarChart3, Plus, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { PageHeading } from '@/components/shared/PageHeading'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { TEAM_MEMBERS } from '@/lib/mock-data'

export function UserManagementTable() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Manager workspace"
        title="Team overview"
        description="Monitor submissions, compliance, and workload across your team."
        action={
          <Button>
            <Plus data-icon="inline-start" />
            Invite member
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Team members" value="24" icon={Users} />
        <StatCard label="Avg. compliance" value="94%" icon={BarChart3} />
        <StatCard label="Open blockers" value="9" icon={AlertCircle} />
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Team members</CardTitle>
          <CardDescription>
            Weekly submission health by member.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-y bg-muted/40 text-left text-xs text-muted-foreground">
                  <th className="px-6 py-3">Member</th>
                  <th className="px-4 py-3">Reports</th>
                  <th className="px-4 py-3">Compliance</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {TEAM_MEMBERS.map((member) => (
                  <tr key={member.id} className="border-b last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {member.reports}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Progress value={member.compliance} className="w-24" />
                        <span className="text-xs text-muted-foreground">
                          {member.compliance}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="outline">
                        View reports
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
