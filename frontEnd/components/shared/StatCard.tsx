import { Card, CardContent } from '@/components/ui/card'
import type { IStatCardProps } from '@/types'

export function StatCard({ label, value, icon: Icon }: IStatCardProps) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className="rounded-lg bg-muted p-2.5 text-muted-foreground">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}
