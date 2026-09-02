import type { ReactNode } from 'react'
import { WorkspaceShell } from '@/components/layout/WorkspaceShell'

interface IWorkspaceLayoutProps {
  children: ReactNode
}

export default function WorkspaceLayout({ children }: IWorkspaceLayoutProps) {
  return <WorkspaceShell>{children}</WorkspaceShell>
}
