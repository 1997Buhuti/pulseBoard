import { FolderKanban, Plus, SlidersHorizontal } from 'lucide-react'
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
import { PROJECTS } from '@/lib/mock-data'

export function ProjectManagementTable() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Workspace"
        title="Projects"
        description="See where your team is spending time and how work is progressing."
        action={
          <Button>
            <Plus data-icon="inline-start" />
            New project
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project) => (
          <Card key={project.id} className="shadow-none">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${project.color}/15 text-foreground`}
                >
                  <FolderKanban className="size-5" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`More options for ${project.name}`}
                >
                  <SlidersHorizontal />
                </Button>
              </div>
              <CardTitle className="pt-2 text-base">{project.name}</CardTitle>
              <CardDescription>
                {project.code} · {project.members} members
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-medium">{project.completion}%</span>
              </div>
              <Progress value={project.completion} />
              <p className="text-xs text-muted-foreground">{project.reports}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
