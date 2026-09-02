import type { IPageHeadingProps } from '@/types'

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: IPageHeadingProps) {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <p className="text-pretty text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </section>
  )
}
