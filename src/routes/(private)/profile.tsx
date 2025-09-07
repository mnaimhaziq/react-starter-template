import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Route = createFileRoute('/(private)/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8 space-y-10 max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden ring-4 ring-blue-500/20">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Naim Haziq</h2>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Traveler & Tech Enthusiast | Joined June 2023
          </p>
          <Button
            className="mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-6 py-2.5 transition-all duration-200 hover:shadow-md"
          >
            Edit Profile
          </Button>
        </motion.div>

        {/* Personal Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 p-8 shadow-lg backdrop-blur-sm space-y-8 transition-all duration-300 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold tracking-tight">Personal Information</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value="mnaimhaziq@gmail.com"
                readOnly
                className="mt-2 rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="mt-2 rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</Label>
              <Input
                id="location"
                placeholder="San Francisco, CA"
                className="mt-2 rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-6 py-2.5 transition-all duration-200 hover:shadow-md"
            >
              Update Information
            </Button>
          </div>
        </motion.section>

        {/* Account Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 p-8 shadow-lg backdrop-blur-sm space-y-6 transition-all duration-300 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold tracking-tight">Recent Activity</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between py-2 border-b border-gray-200/50 dark:border-gray-800/50">
              <span className="text-sm text-gray-700 dark:text-gray-300">Booked a trip to Paris</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Sep 5, 2025</span>
            </li>
            <li className="flex items-center justify-between py-2 border-b border-gray-200/50 dark:border-gray-800/50">
              <span className="text-sm text-gray-700 dark:text-gray-300">Updated profile picture</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Aug 28, 2025</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Reviewed a stay in Tokyo</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Aug 15, 2025</span>
            </li>
          </ul>
        </motion.section>

        {/* Account Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 p-8 shadow-lg backdrop-blur-sm space-y-6 transition-all duration-300 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold tracking-tight">Account Stats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">12</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Trips Completed</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">8</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Reviews Written</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">3</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Bookings</p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}