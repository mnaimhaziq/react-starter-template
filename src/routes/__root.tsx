import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeInit } from "../../.flowbite-react/init";
import { NavigationBar } from "../components/navigations/navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ThemeInit />
        <NavigationBar/>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
