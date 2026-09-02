export enum ReportStatus {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  NEEDS_CORRECTION = 'Needs Correction',
  APPROVED = 'Approved',
}

export enum TaskStatus {
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In progress',
  BLOCKED = 'Blocked',
}

export enum TaskPriority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum MemberStatus {
  ON_TRACK = 'On track',
  AT_RISK = 'At risk',
}

export enum ActivityTone {
  PRIMARY = 'primary',
  ACCENT = 'accent',
  SUCCESS = 'success',
  MUTED = 'muted',
}

export enum NavSection {
  OVERVIEW = 'Overview',
  REPORTS = 'Reports',
  TEAM = 'Team',
  PROJECTS = 'Projects',
  REVIEWS = 'Reviews',
  SETTINGS = 'Settings',
}
