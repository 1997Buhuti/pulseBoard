'use client'

import { Bell, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface IRouteTitle {
  match: (pathname: string) => boolean
  title: string
}

const ROUTE_TITLES: IRouteTitle[] = [
  { match: (p) => p.startsWith('/reports/create'), title: 'New report' },
  { match: (p) => p.startsWith('/reports/'), title: 'Report detail' },
  { match: (p) => p.startsWith('/reports'), title: 'Reports' },
  { match: (p) => p.startsWith('/reviews'), title: 'Reviews' },
  { match: (p) => p.startsWith('/team'), title: 'Team' },
  { match: (p) => p.startsWith('/projects'), title: 'Projects' },
  { match: (p) => p.startsWith('/settings'), title: 'Settings' },
  { match: (p) => p.startsWith('/dashboard') || p === '/', title: 'Overview' },
]

const MOBILE_LINKS = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/reports', label: 'Reports' },
  { href: '/team', label: 'Team' },
  { href: '/projects', label: 'Projects' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/settings', label: 'Settings' },
]

function resolveTitle(pathname: string): string {
  const found = ROUTE_TITLES.find((route) => route.match(pathname))
  return found?.title ?? 'Overview'
}

export function AppHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const currentTitle = resolveTitle(pathname)

  return (
    <>
      <header className="flex h-20 items-center justify-between border-b bg-card px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            type="button"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Pulseboard workspace
            </p>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {currentTitle}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="relative rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Notifications"
            type="button"
          >
            <Bell className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
          </button>
          <Separator orientation="vertical" className="hidden h-7 sm:block" />
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
              JM
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      {mobileOpen && (
        <div className="border-b bg-sidebar p-3 lg:hidden">
          <nav className="grid grid-cols-2 gap-1" aria-label="Mobile navigation">
            {MOBILE_LINKS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    active
                      ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70'
                  }`}
                >
                  <span className="size-1.5 rounded-full bg-current" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
