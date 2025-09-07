// src/components/navigations/header.tsx
"use client";
import React, { useMemo } from "react";
import { DarkThemeToggle } from "flowbite-react";
import { useNavigationStore } from "@/store/navigation.store";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import Notification from "@/components/non-shared/Notification";
import { IconType } from "react-icons";
import { menuItems } from "@/constants/menuItems.constant";
import { IoIosSettings } from "react-icons/io";

const Header = () => {
  const location = useRouterState().location;
  const path = location.pathname;
  const navigate = useNavigate();

  // Flatten all menu items + children for lookup
  const allMenuItems = useMemo(() => {
    const flat: { href: string; name: string; icon?: IconType }[] = [];
    menuItems.forEach((category) => {
      category.items.forEach((item) => {
        if (item.href) {
          flat.push({ href: item.href, name: item.name, icon: item.icon });
        }
        if (item.children) {
          item.children.forEach((sub) =>
            flat.push({ href: sub.href, name: sub.name, icon: item.icon })
          );
        }
      });
    });
    return flat;
  }, []);

  // Match current path with menu item
  const currentMenu = useMemo(() => {
    return allMenuItems.find((m) => path.startsWith(m.href));
  }, [path, allMenuItems]);

  // Breadcrumbs
  const breadcrumbs = useMemo(() => {
    return path
      .split("/")
      .filter(Boolean)
      .filter((seg) => seg !== "(private)")
      .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1));
  }, [path]);

  return (
    <header className="flex fixed sm:static h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-10 sm:px-4 shadow-sm dark:border-neutral-950 dark:bg-neutral-900">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        {currentMenu?.icon && (
          <currentMenu.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
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
          onClick={() => navigate({ to: "/settings" })}
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <IoIosSettings  className="h-5 w-5 text-gray-600 dark:text-gray-300"/>
        </button>
      </div>
    </header>
  );
};

export default Header;
