import { AppHeader } from '@/components/layout/AppHeader'
import { AppSidebar } from '@/components/layout/AppSidebar'

interface IWorkspaceShellProps {
  children: React.ReactNode
}

export function WorkspaceShell({ children }: IWorkspaceShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
