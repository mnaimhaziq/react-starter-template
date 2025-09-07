import ProductDashboard from '@/components/non-shared/ProductDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/management/clients/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProductDashboard/>
}
