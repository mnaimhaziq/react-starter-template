"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMenuAlt2,
  HiOutlineChevronDown,
  HiOutlineLogout,
  HiOutlineUser,
} from "react-icons/hi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { useNavigate } from "@tanstack/react-router";
import { useNavigationStore } from "@/store/navigation.store";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/constants/menuItems.constant";

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
      className={`fixed top-0 left-0 z-10 h-full border-r border-gray-200 bg-gray-100 shadow-xl transition-[width] duration-300 ease-in-out dark:border-gray-700 dark:bg-black ${
        isCollapsed ? "w-14" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-3 pt-3 pb-5">
        {!isCollapsed && (
          <h1 className="text-base font-bold tracking-tight text-gray-800 dark:text-gray-100">
            Kravio
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <HiOutlineMenuAlt2
            className={`h-4 w-4 text-gray-600 transition-transform duration-300 dark:text-gray-300 ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Menu Items with Custom Scrollbar */}
      <nav
        className="flex h-[calc(100vh-130px)] flex-col gap-4 overflow-y-auto px-2 pb-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 scrollbar-thumb-rounded"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)",
        }}
      >
        <style jsx>{`
          :root {
            --scrollbar-thumb: #d1d5db; /* gray-300 */
            --scrollbar-track: #f3f4f6; /* gray-100 */
            --scrollbar-thumb-hover: #9ca3af; /* gray-400 */
          }
          .dark {
            --scrollbar-thumb: #4b5563; /* gray-600 */
            --scrollbar-track: #1f2937; /* gray-800 */
            --scrollbar-thumb-hover: #6b7280; /* gray-500 */
          }
          nav::-webkit-scrollbar {
            width: 6px;
          }
          nav::-webkit-scrollbar-track {
            background: var(--scrollbar-track);
          }
          nav::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb);
            border-radius: 3px;
          }
          nav::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover);
          }
        `}</style>
        {menuItems.map((section, idx) => (
          <div key={idx}>
            {!isCollapsed && (
              <h2 className="mb-1 px-2 text-[10px] font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                {section.category}
              </h2>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item, i) => (
                <div key={i}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className="cursor-pointer flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-xs font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center gap-2">
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                        {!isCollapsed && (
                          <HiOutlineChevronDown
                            className={`h-3 w-3 transform transition-transform ${
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
                            className="mt-0.5 ml-8 flex flex-col gap-0.5 overflow-hidden"
                          >
                            {item.children.map((sub, j) => (
                              <div className="flex items-center" key={j}>
                                <MdOutlineSubdirectoryArrowRight className="h-4 w-4 text-gray-400" />
                                <button
                                  onClick={() => handleNav(sub.href)}
                                  className="rounded-md px-2 py-1.5 text-left text-xs text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                >
                                  {sub.name}
                                </button>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNav(item.href!)}
                      className="cursor-pointer flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
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
      <div className="absolute right-0 bottom-0 left-0 border-t border-gray-200 px-3 py-3 dark:border-gray-700">
        {!isCollapsed && (
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-white dark:bg-black p-1.5 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex gap-2 rounded-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-400 to-indigo-600 font-semibold text-white text-xs">
                NH
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                  Naim Haziq
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  mnaimhaziq@gmail.com
                </span>
              </div>
            </div>
            <div className="m-0 flex flex-col items-center justify-center gap-0 p-0">
              <MdKeyboardArrowUp className="p-0 m-0 h-4 w-4 text-black dark:text-white -mb-1.5" />
              <MdKeyboardArrowDown className="h-4 w-4 text-black dark:text-white" />
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
              className="absolute bottom-14 left-3 z-50 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <ul className="flex flex-col">
                <li>
                  <button
                    onClick={() => handleNav("/profile")}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <HiOutlineUser className="h-3 w-3" /> Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate({ to: "/" })}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <HiOutlineLogout className="h-3 w-3" /> Logout
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