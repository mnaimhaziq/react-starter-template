import { RouterProvider, createRouter } from "@tanstack/react-router";
import { initThemeMode } from "flowbite-react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./lib/i18n";

export const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
  initThemeMode();
}

function App() {
  return <RouterProvider router={router} defaultPreload="intent" />;
}
