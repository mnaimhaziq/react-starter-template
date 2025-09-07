// src/components/navigations/header.tsx
"use client";
import React, { useMemo } from "react";
import { HiBell, HiCog, HiHome } from "react-icons/hi";
import { DarkThemeToggle } from "flowbite-react";
import { useNavigationStore } from "@/store/navigation.store";

const Header = () => {
  const path = useNavigationStore((s) => s.path);

  // Convert "/(private)/overview/dashboard" -> ["Overview", "Dashboard"]
  const breadcrumbs = useMemo(() => {
    if (!path) return ["Overview", "Dashboard"]; // default
    return path
      .split("/")
      .filter(Boolean)
      .filter((seg) => seg !== "(private)") // remove private prefix
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
        <button className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <HiBell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <DarkThemeToggle />
        <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <HiCog className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;
