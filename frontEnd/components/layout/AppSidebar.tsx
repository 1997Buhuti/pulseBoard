'use client'

import type { ComponentType } from 'react'
import {
  ChevronDown,
  ClipboardCheck,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface INavLink {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
}

const WORKSPACE_LINKS: INavLink[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
]

const MANAGE_LINKS: INavLink[] = [
  { href: '/reviews', label: 'Reviews', icon: ShieldCheck },
  { href: '/settings', label: 'Settings', icon: Settings },
]

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/dashboard') {
    return pathname === '/dashboard' || pathname === '/'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavButton({ href, label, icon: Icon, active }: INavLink & { active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
        active
          ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/65 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground'
      }`}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </Link>
  )
}

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-20 items-center gap-3 px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
          <ClipboardCheck className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold tracking-tight text-sidebar-foreground">
            Pulseboard
          </p>
          <p className="text-xs text-sidebar-foreground/60">Weekly reporting</p>
        </div>
      </div>
      <Separator />
      <nav className="flex flex-1 flex-col gap-1 px-3 py-6" aria-label="Primary navigation">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/45">
          Workspace
        </p>
        {WORKSPACE_LINKS.map((link) => (
          <NavButton
            key={link.href}
            {...link}
            active={isActivePath(pathname, link.href)}
          />
        ))}
        <div className="mt-7">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/45">
            Manage
          </p>
          {MANAGE_LINKS.map((link) => (
            <NavButton
              key={link.href}
              {...link}
              active={isActivePath(pathname, link.href)}
            />
          ))}
        </div>
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/70 p-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-sidebar-primary text-xs text-sidebar-primary-foreground">
              JM
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              Jamie Morgan
            </p>
            <p className="text-xs text-sidebar-foreground/60">Team Member</p>
          </div>
          <ChevronDown className="size-4 text-sidebar-foreground/50" />
        </div>
      </div>
    </aside>
  )
}
