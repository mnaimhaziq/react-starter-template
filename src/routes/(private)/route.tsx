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
      {/* Sidebar */}
      <div
        className={`relative flex  md:flex-row flex-col overflow-hidden border-r border-gray-200 bg-gray-100 shadow-xl transition-[width] duration-300 ease-in-out dark:border-gray-700 dark:bg-black ${
          isCollapsed ? "w-14" : "w-64"
        }`}
      >
        <CollapsibleSidebar />
      </div>

      {/* Right side (Header + Content) */}
      <div className="flex w-full flex-1 flex-col">
        {/* Header - Fixed, starts after sidebar */}
        <div
          className={`md:fixed top-0 z-50 ${
            isCollapsed ? "left-14" : "left-64"
          } right-0`}
        >
          <Header />
        </div>

        {/* Main content with padding-top to account for fixed header height */}
        <div className="flex-1  bg-gray-50 pt-24 p-6  text-gray-900 dark:bg-neutral-900 dark:text-gray-100">
          <React.Suspense fallback={<SkeletonComponent />}>
            <Outlet />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}