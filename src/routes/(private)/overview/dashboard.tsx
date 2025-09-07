import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export const Route = createFileRoute("/(private)/overview/dashboard")({
  component: RouteComponent,
});

const ticketTrendData = [
  { day: "Mon", tickets: 200 },
  { day: "Tue", tickets: 300 },
  { day: "Wed", tickets: 250 },
  { day: "Thu", tickets: 400 },
  { day: "Fri", tickets: 280 },
  { day: "Sat", tickets: 350 },
  { day: "Sun", tickets: 500 },
];

const resolutionData = [
  { name: "0-2h", value: 40 },
  { name: "2-6h", value: 30 },
  { name: "6-12h", value: 20 },
  { name: "12h+", value: 10 },
];

const agentPerformance = [
  { agent: "John", resolved: 120 },
  { agent: "Sarah", resolved: 90 },
  { agent: "Ali", resolved: 140 },
  { agent: "Maya", resolved: 80 },
];

function RouteComponent() {
  const [filter, setFilter] = useState("Last 7 days");
  return (
    <div className="flex h-screen w-full rounded-2xl bg-gray-50 text-gray-900 dark:bg-black dark:text-gray-100">
      <main className="flex-1 px-6 py-6">
        {/* Header */}
        <header className="mb-6 flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Hello, Naim Haziq 👋</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Here are the latest insights from your customer interactions.
            </p>
          </div>
         <div className="flex items-center gap-2">
            {/* Dropdown Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {filter}<MdKeyboardArrowDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                asChild
                align="end"
                className="rounded-xl border border-gray-200 bg-white/95 p-2 shadow-lg backdrop-blur dark:border-gray-800 dark:bg-gray-900/95"
              >
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  {["Last 7 days", "Last 30 days", "This week", "Custom range"].map(
                    (option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setFilter(option)}
                        className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          filter === option ? "bg-gray-100 dark:bg-gray-800" : ""
                        }`}
                      >
                        {option}
                      </DropdownMenuItem>
                    )
                  )}
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Three dots menu */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <BsThreeDotsVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { title: "Current Tickets", value: "3,484", trend: "+71%" },
            { title: "Daily Avg. Resolution", value: "486", trend: "+2%" },
            { title: "SLA Compliance Rate", value: "92%", trend: "-1.3%" },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-sm font-medium text-gray-500">
                {card.title}
              </h3>
              <p className="mt-1 text-2xl font-bold">{card.value}</p>
              <span
                className={`text-sm ${
                  card.trend.startsWith("+") ? "text-green-500" : "text-red-500"
                }`}
              >
                {card.trend} vs last week
              </span>
            </motion.div>
          ))}
        </section>

        {/* Charts Grid */}
        <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <h3 className="mb-2 text-sm font-medium text-gray-500">
              Ticket Volume Trend
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ticketTrendData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="tickets"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <h3 className="mb-2 text-sm font-medium text-gray-500">
              Agent Performance
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="agent" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="resolved"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </section>

        {/* Table */}
        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h3 className="mb-3 text-sm font-medium text-gray-500">
            SLA Monitoring
          </h3>
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "#2319",
                  "Payment failed on invoice",
                  "High",
                  "John Doe",
                  "In Review",
                  "2025-08-18",
                ],
                [
                  "#2320",
                  "Login issue",
                  "Medium",
                  "Sarah Lee",
                  "Delivered",
                  "2025-08-19",
                ],
              ].map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="py-2">
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
