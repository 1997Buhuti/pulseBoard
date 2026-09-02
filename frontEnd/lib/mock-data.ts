import {
  ActivityTone,
  MemberStatus,
  ReportStatus,
  TaskPriority,
  TaskStatus,
} from '@/types/enums'
import type {
  IActivityItem,
  IDashboardMetric,
  IProject,
  IReportTask,
  ITeamMember,
  IWeeklyReport,
} from '@/types'

export const REPORTS: IWeeklyReport[] = [
  {
    id: 'rpt-1',
    range: 'May 20 – May 26, 2024',
    project: 'Product Design',
    status: ReportStatus.NEEDS_CORRECTION,
  },
  {
    id: 'rpt-2',
    range: 'May 13 – May 19, 2024',
    project: 'Product Design',
    status: ReportStatus.SUBMITTED,
  },
  {
    id: 'rpt-3',
    range: 'May 06 – May 12, 2024',
    project: 'Website Redesign',
    status: ReportStatus.APPROVED,
  },
  {
    id: 'rpt-4',
    range: 'Apr 29 – May 05, 2024',
    project: 'Website Redesign',
    status: ReportStatus.APPROVED,
  },
  {
    id: 'rpt-5',
    range: 'Apr 22 – Apr 28, 2024',
    project: 'Product Design',
    status: ReportStatus.DRAFT,
  },
  {
    id: 'rpt-6',
    range: 'Apr 15 – Apr 21, 2024',
    project: 'Internal Operations',
    status: ReportStatus.SUBMITTED,
  },
]

export const TASKS: IReportTask[] = [
  {
    name: 'Finalize onboarding flow',
    priority: TaskPriority.HIGH,
    planned: 92,
    actual: 84,
    status: TaskStatus.COMPLETED,
    time: '6h 30m',
    output: 'Prototype v3',
  },
  {
    name: 'Review analytics dashboard',
    priority: TaskPriority.MEDIUM,
    planned: 78,
    actual: 72,
    status: TaskStatus.IN_PROGRESS,
    time: '4h 15m',
    output: 'Insights doc',
  },
  {
    name: 'Update help center content',
    priority: TaskPriority.LOW,
    planned: 64,
    actual: 64,
    status: TaskStatus.COMPLETED,
    time: '3h 45m',
    output: '12 articles',
  },
  {
    name: 'Stakeholder sync and notes',
    priority: TaskPriority.MEDIUM,
    planned: 100,
    actual: 90,
    status: TaskStatus.COMPLETED,
    time: '2h 00m',
    output: 'Decision log',
  },
]

export const ACTIVITY: IActivityItem[] = [
  {
    id: 'act-1',
    iconName: 'FileCheck2',
    title: 'Weekly report submitted',
    detail: 'May 20 – May 26 · Product Design',
    time: '2 hours ago',
    tone: ActivityTone.PRIMARY,
  },
  {
    id: 'act-2',
    iconName: 'AlertCircle',
    title: 'Report needs correction',
    detail: 'May 13 – May 19 · Product Design',
    time: 'Yesterday',
    tone: ActivityTone.ACCENT,
  },
  {
    id: 'act-3',
    iconName: 'CheckCircle2',
    title: 'Report approved',
    detail: 'May 06 – May 12 · Website Redesign',
    time: '3 days ago',
    tone: ActivityTone.SUCCESS,
  },
  {
    id: 'act-4',
    iconName: 'Clock3',
    title: 'Draft saved',
    detail: 'May 20 – May 26 · Internal Operations',
    time: 'May 24',
    tone: ActivityTone.MUTED,
  },
]

export const TEAM_MEMBERS: ITeamMember[] = [
  {
    id: 'usr-1',
    initials: 'JM',
    name: 'Jamie Morgan',
    role: 'Product Designer',
    reports: '12 / 12',
    compliance: 100,
    status: MemberStatus.ON_TRACK,
  },
  {
    id: 'usr-2',
    initials: 'AL',
    name: 'Alex Lee',
    role: 'Frontend Engineer',
    reports: '10 / 12',
    compliance: 83,
    status: MemberStatus.AT_RISK,
  },
  {
    id: 'usr-3',
    initials: 'SK',
    name: 'Sam Kim',
    role: 'Product Manager',
    reports: '12 / 12',
    compliance: 100,
    status: MemberStatus.ON_TRACK,
  },
  {
    id: 'usr-4',
    initials: 'NR',
    name: 'Nora Reed',
    role: 'UX Researcher',
    reports: '11 / 12',
    compliance: 92,
    status: MemberStatus.ON_TRACK,
  },
]

export const PROJECTS: IProject[] = [
  {
    id: 'prj-1',
    name: 'Product Design',
    code: 'PD-042',
    members: 8,
    completion: 78,
    reports: '32 this month',
    color: 'bg-primary',
  },
  {
    id: 'prj-2',
    name: 'Website Redesign',
    code: 'WEB-118',
    members: 5,
    completion: 64,
    reports: '21 this month',
    color: 'bg-chart-2',
  },
  {
    id: 'prj-3',
    name: 'Internal Operations',
    code: 'OPS-009',
    members: 12,
    completion: 91,
    reports: '44 this month',
    color: 'bg-accent',
  },
]

export const DASHBOARD_METRICS: IDashboardMetric[] = [
  {
    label: 'Reports this week',
    value: '42',
    change: '+8.4%',
    direction: 'up',
    iconName: 'FileText',
  },
  {
    label: 'Compliance rate',
    value: '94.2%',
    change: '+2.1%',
    direction: 'up',
    iconName: 'CheckCircle2',
  },
  {
    label: 'Needs correction',
    value: '6',
    change: '-12.5%',
    direction: 'down',
    iconName: 'AlertCircle',
  },
  {
    label: 'Open blockers',
    value: '9',
    change: '+3',
    direction: 'up',
    iconName: 'Activity',
  },
]

export const TASKS_TREND: number[] = [44, 59, 51, 73, 68, 86]

export const WORKLOAD_BY_PROJECT: { name: string; percentage: string; color: string }[] = [
  { name: 'Product Design', percentage: '46%', color: 'bg-primary' },
  { name: 'Website Redesign', percentage: '30%', color: 'bg-chart-2' },
  { name: 'Operations', percentage: '24%', color: 'bg-accent' },
]
