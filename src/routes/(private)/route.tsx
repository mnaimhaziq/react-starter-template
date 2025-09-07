// src/routes/(private)/route.tsx
import Header from "@/components/shared/navigations/Header";
import CollapsibleSidebar from "@/components/shared/navigations/Sidenav";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import React from "react";
import SkeletonComponent from "@/components/shared/SkeletonComponent";
import { useNavigationStore } from "@/store/navigation.store";

export const Route = createFileRoute("/(private)")({
  // beforeLoad: async ({ location }) => {
  //   const isAuthenticated = false;
  //   if (!isAuthenticated) {
  //     throw redirect({
  //       to: "/auth/login",
  //       search: { redirect: location.href },
  //     });
  //   }
  // },
  component: PrivateLayout,
});

function PrivateLayout() {
    const { isCollapsed } = useNavigationStore();
  return (
    <div className="flex min-h-screen">
      <div className={`relative flex flex-col overflow-hidden border-r border-gray-200 bg-gray-100 shadow-xl transition-[width] duration-300 ease-in-out dark:border-gray-700 dark:bg-black ${isCollapsed ? "w-16" : "w-72"}`}>
      <CollapsibleSidebar />

      </div>
      {/* Sidebar */}

      {/* Right side (Header + Content) */}
      <div className="flex w-full flex-1 flex-col">
        {/* Header */}
        <Header />

        {/* Main content should take the rest */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 text-gray-900 dark:bg-neutral-900 dark:text-gray-100">
          <React.Suspense fallback={<SkeletonComponent />}>
            <Outlet />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
