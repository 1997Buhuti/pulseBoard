import { ReportDetailView } from '@/components/features/reports/ReportDetailView'

interface IReportDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ReportDetailPage({
  params,
}: IReportDetailPageProps) {
  const { id } = await params
  return <ReportDetailView reportId={id} />
}
