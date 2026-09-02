import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface IFieldCardProps {
  label: string
  placeholder: string
  checkbox?: string
}

export function FieldCard({ label, placeholder, checkbox }: IFieldCardProps) {
  return (
    <Card className="shadow-none">
      <CardHeader className="gap-1 pb-3">
        <CardTitle className="text-sm">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Textarea placeholder={placeholder} className="min-h-32 resize-y" />
        {checkbox && (
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              className="size-4 rounded border-input accent-primary"
            />
            {checkbox}
          </label>
        )}
      </CardContent>
    </Card>
  )
}
