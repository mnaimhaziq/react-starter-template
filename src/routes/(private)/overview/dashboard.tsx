import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/(private)/overview/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-black rounded-2xl text-gray-900 dark:text-gray-100">
    

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        {/* Header */}
        <header className="mb-6">
          <h2 className="text-2xl font-semibold">Hello, Achmad Hakim 👋</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Here are the latest insights from your customer interactions.
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {[
            { title: 'Current Tickets', value: '3,484', trend: '+71%' },
            { title: 'Daily Avg. Resolution', value: '486', trend: '+2%' },
            { title: 'SLA Compliance Rate', value: '92%', trend: '-1.3%' },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
              <p className="text-2xl font-bold mt-1">{card.value}</p>
              <span
                className={`text-sm ${
                  card.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {card.trend} vs last week
              </span>
            </motion.div>
          ))}
        </section>

        {/* Chart Placeholder */}
        <section className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Ticket Volume Trend</h3>
          <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-600">
            📊 Chart goes here (use Recharts or Chart.js)
          </div>
        </section>

        {/* Table */}
        <section className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-3">SLA Monitoring</h3>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
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
                ['#2319', 'Payment failed on invoice', 'High', 'John Doe', 'In Review', '2025-08-18'],
                ['#2320', 'Login issue', 'Medium', 'Sarah Lee', 'Delivered', '2025-08-19'],
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
  )
}