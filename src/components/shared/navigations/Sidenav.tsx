// src/components/shared/navigations/sidenav.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiUser,
  HiTable,
  HiChartBar,
  HiCog,
  HiMenuAlt2,
  HiChevronDown,
  HiLogout,
} from "react-icons/hi";
import { useNavigate } from "@tanstack/react-router";
import { useNavigationStore } from "@/store/navigation.store";

const menuItems = [
  {
    category: "Main",
    items: [
      {
        name: "Overview",
        icon: <HiHome className="h-5 w-5" />,
        href: "/overview/dashboard",
      },
      {
        name: "Tickets",
        icon: <HiUser className="h-5 w-5" />,
        children: [
          {
            name: "Open Tickets",
            href: "/tickets/open",
          },
          {
            name: "Closed Tickets",
            href: "/tickets/closed",
          },
        ],
      },
    ],
  },
  {
    category: "Management",
    items: [
      {
        name: "Clients",
        icon: <HiChartBar className="h-5 w-5" />,
        href: "/management/clients",
      },
      {
        name: "Reports",
        icon: <HiTable className="h-5 w-5" />,
        href: "/management/reports",
      },
      {
        name: "Tickets",
        icon: <HiTable className="h-5 w-5" />,
        href: "/management/tickets",
      },
    ],
  },
  {
    category: "Settings",
    items: [
      {
        name: "Preferences",
        icon: <HiCog className="h-5 w-5" />,
        href: "/settings/preferences",
      },
    ],
  },
];

export default function CollapsibleSidebar() {
  const navigate = useNavigate();
  const {
    setPath,
    isCollapsed,
    setIsCollapsed,
    openMenus,
    toggleSubmenu,
    showProfileMenu,
    setShowProfileMenu,
  } = useNavigationStore();

  const handleNav = (href: string) => {
    navigate({ to: href });
    setPath(href);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full border-r border-gray-200 bg-gray-100 shadow-xl transition-[width] duration-300 ease-in-out dark:border-gray-700 dark:bg-black z-10 ${
        isCollapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-4">
        {!isCollapsed && (
          <h1 className="text-lg font-bold tracking-tight text-gray-800 dark:text-gray-100">
            Kravio
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <HiMenuAlt2
            className={`h-5 w-5 text-gray-600 transition-transform duration-300 dark:text-gray-300 ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-5 overflow-y-auto h-[calc(100vh-112px)] px-3">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            {!isCollapsed && (
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                {section.category}
              </h2>
            )}
            <div className="flex flex-col gap-1">
              {section.items.map((item, i) => (
                <div key={i}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                        {!isCollapsed && (
                          <HiChevronDown
                            className={`h-4 w-4 transform transition-transform ${
                              openMenus[item.name] ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>
                      <AnimatePresence>
                        {openMenus[item.name] && !isCollapsed && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mt-1 ml-10 flex flex-col gap-1 overflow-hidden"
                          >
                            {item.children.map((sub, j) => (
                              <button
                                key={j}
                                onClick={() => handleNav(sub.href)}
                                className="rounded-md px-2 py-2 text-left text-sm text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                              >
                                {sub.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNav(item.href)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      {item.icon}
                      {!isCollapsed && <span>{item.name}</span>}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer (Profile + Logout) */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 px-4 py-4 dark:border-gray-700">
        {!isCollapsed && (
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-400 to-indigo-600 font-semibold text-white">
              AH
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Achmad Hakim
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                achmad.hakim@gmail.com
              </span>
            </div>
          </div>
        )}

        {/* Dropdown */}
        <AnimatePresence>
          {showProfileMenu && !isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-4 z-50 w-56 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <ul className="flex flex-col">
                <li>
                  <button
                    onClick={() => handleNav("/(private)/profile")}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <HiUser className="h-4 w-4" /> Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate({ to: "/" })}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <HiLogout className="h-4 w-4" /> Logout
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}