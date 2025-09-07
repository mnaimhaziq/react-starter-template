import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConfirmDialog } from '@/components/reusable/confirmdialog'

export const Route = createFileRoute('/(private)/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const [openConfirm, setOpenConfirm] = useState(false)

  const handleDelete = () => {
    console.log("Account deleted ✅")
    setOpenConfirm(false)
    // TODO: call API to actually delete account
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8 space-y-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Customize your account and tailor your experience with ease.
          </p>
        </motion.div>

        {/* Profile Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 p-8 shadow-lg backdrop-blur-sm space-y-8 transition-all duration-300 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold tracking-tight">Profile</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                className="mt-2 rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <div>
              <Label htmlFor="language" className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</Label>
              <Select>
                <SelectTrigger className="mt-2 rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ms">Bahasa Malaysia</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-6 py-2.5 transition-all duration-200 hover:shadow-md"
            >
              Save Changes
            </Button>
          </div>
        </motion.section>

        {/* Preferences */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 p-8 shadow-lg backdrop-blur-sm space-y-6 transition-all duration-300 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold tracking-tight">Preferences</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
              <Switch className="data-[state=checked]:bg-blue-600" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</span>
              <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
              <Switch className="data-[state=checked]:bg-blue-600" />
            </div>
          </div>
        </motion.section>

        {/* Danger Zone */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-red-200/50 dark:border-red-800/50 bg-white/80 dark:bg-gray-950/80 p-8 shadow-lg backdrop-blur-sm space-y-6 transition-all duration-300 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold tracking-tight text-red-600 dark:text-red-500">Danger Zone</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Deleting your account is permanent and cannot be undone. Proceed with caution.
          </p>
          <Button
            variant="destructive"
            className="rounded-xl bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium px-6 py-2.5 transition-all duration-200 hover:shadow-md"
            onClick={() => setOpenConfirm(true)}
          >
            Delete Account
          </Button>
        </motion.section>
      </main>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={openConfirm}
        title="Delete your account?"
        description="This action is permanent and will remove all your data. Are you absolutely sure?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </div>
  )
}
