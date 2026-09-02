import type { ComponentType, ReactNode } from 'react'
import type {
  ActivityTone,
  MemberStatus,
  ReportStatus,
  TaskPriority,
  TaskStatus,
} from '@/types/enums'

export interface IWeeklyReport {
  id: string
  range: string
  project: string
  status: ReportStatus
}

export interface IReportTask {
  name: string
  priority: TaskPriority
  planned: number
  actual: number
  status: TaskStatus
  time: string
  output: string
}

export interface IActivityItem {
  id: string
  iconName: 'FileCheck2' | 'AlertCircle' | 'CheckCircle2' | 'Clock3'
  title: string
  detail: string
  time: string
  tone: ActivityTone
}

export interface ITeamMember {
  id: string
  initials: string
  name: string
  role: string
  reports: string
  compliance: number
  status: MemberStatus
}

export interface IProject {
  id: string
  name: string
  code: string
  members: number
  completion: number
  reports: string
  color: string
}

export interface IDashboardMetric {
  label: string
  value: string
  change: string
  direction: 'up' | 'down'
  iconName: 'FileText' | 'CheckCircle2' | 'AlertCircle' | 'Activity'
}

export interface IPageHeadingProps {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}

export interface IStatusBadgeProps {
  status: string
}

export interface IStatCardProps {
  label: string
  value: string
  icon: ComponentType<{ className?: string }>
}
