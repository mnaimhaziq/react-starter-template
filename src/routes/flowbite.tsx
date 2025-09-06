import { createFileRoute } from '@tanstack/react-router'
import ProductDashboard from '../components/ProductDashboard'
import { DarkThemeToggle } from 'flowbite-react';

export const Route = createFileRoute('/flowbite')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <DarkThemeToggle/>
      <ProductDashboard />
    </>
  );
}
