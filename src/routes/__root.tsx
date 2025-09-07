import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeInit } from "../../.flowbite-react/init";
import NotFound from "@/components/shared/NotFound";
import { NavigationBar } from "@/components/shared/navigations/navbar";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  const location = useLocation();
  const showNavBar = ["/", "/home", "/about", "/pricing"].includes(
    location.pathname,
  );

  return (
    <>
      <ThemeInit />
      {showNavBar && <NavigationBar />}
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
