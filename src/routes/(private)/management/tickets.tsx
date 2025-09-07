import TicketTable from '@/components/non-shared/TicketTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/management/tickets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><TicketTable/></div>
}
