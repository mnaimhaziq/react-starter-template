"use client";
import React, { useState, useRef, useEffect } from "react";
import { HiBell } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    { id: 1, text: "New message from Admin" },
    { id: 2, text: "Your subscription will expire soon" },
    { id: 3, text: "System update scheduled for tonight" },
    { id: 4, text: "Welcome to the platform 🎉" },
    { id: 5, text: "You have a new follower" },
    { id: 6, text: "Password changed successfully" },
    { id: 7, text: "New comment on your post" },
    { id: 8, text: "Reminder: Complete your profile" },
    { id: 9, text: "Your payment was successful ✅" },
    { id: 10, text: "Weekly report is now available" },
  ];

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <HiBell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-72 rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Notifications
              </span>
              <button className="text-xs text-blue-500 hover:underline">
                Mark all as read
              </button>
            </div>

            {/* List */}
            <ul className="max-h-64 overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((note) => (
                  <li
                    key={note.id}
                    className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition"
                  >
                    {note.text}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500">
                  No new notifications
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
