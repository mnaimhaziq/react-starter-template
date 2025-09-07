// src/components/navigations/header.tsx
"use client";
import React, { useMemo } from "react";
import { HiBell, HiCog, HiHome } from "react-icons/hi";
import { DarkThemeToggle } from "flowbite-react";
import { useNavigationStore } from "@/store/navigation.store";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import Notification from "@/components/non-shared/Notification";

const Header = () => {
  const location = useRouterState().location;
  const path = location.pathname;
  const navigate = useNavigate();

  const breadcrumbs = useMemo(() => {
    return path
      .split("/")
      .filter(Boolean)
      .filter((seg) => seg !== "(private)")
      .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1));
  }, [path]);

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-neutral-950 dark:bg-neutral-900">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <HiHome className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="text-gray-400">/</span>}
            <span
              className={`${
                idx === breadcrumbs.length - 1
                  ? "font-semibold text-gray-900 dark:text-white"
                  : ""
              }`}
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
         <Notification /> 
        <DarkThemeToggle />
        <button
          onClick={() => navigate({to: '/settings'})}
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <HiCog className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;
