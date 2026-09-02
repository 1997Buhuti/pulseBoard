import { Badge } from '@/components/ui/badge'
import type { IStatusBadgeProps } from '@/types'

const STATUS_STYLES: Record<string, string> = {
  Draft: 'border-muted-foreground/25 bg-muted text-muted-foreground',
  Submitted: 'border-primary/25 bg-primary/10 text-primary',
  'Needs Correction': 'border-accent/40 bg-accent/15 text-accent-foreground',
  Approved: 'border-chart-2/30 bg-chart-2/10 text-chart-2',
  'On track': 'border-chart-2/30 bg-chart-2/10 text-chart-2',
  'At risk': 'border-accent/40 bg-accent/15 text-accent-foreground',
  Completed: 'border-chart-2/30 bg-chart-2/10 text-chart-2',
  'In progress': 'border-primary/25 bg-primary/10 text-primary',
}

export function StatusBadge({ status }: IStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={
        STATUS_STYLES[status] ??
        'border-muted-foreground/25 bg-muted text-muted-foreground'
      }
    >
      {status}
    </Badge>
  )
}
