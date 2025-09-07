import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { plans } from '@/constants/pricing.constant'

export const Route = createFileRoute('/(public)/pricing')({
  component: RouteComponent,
})

function RouteComponent() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")



  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900 px-6 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Pricing made simple
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Transparent pricing for teams of all sizes. Switch plans anytime.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center items-center gap-3">
          <span className={`text-sm ${billing === "monthly" ? "text-indigo-600 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
            Monthly
          </span>
          <button
            onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-200 dark:bg-gray-800 transition"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-300 shadow transition ${
                billing === "yearly" ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm ${billing === "yearly" ? "text-indigo-600 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
            Yearly <span className="ml-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 text-xs">Save 20%</span>
          </span>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="relative"
          >
            <Card
              className={`rounded-3xl shadow-xl backdrop-blur-xl border transition ${
                plan.highlighted
                  ? "border-indigo-500 bg-white/60 dark:bg-gray-900/70 ring-2 ring-indigo-400/50"
                  : "border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50"
              }`}
            >
              <CardContent className="p-10 flex flex-col items-center text-center space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                  {billing === "monthly" ? plan.monthly : plan.yearly}
                  {plan.monthly !== "Free" && plan.monthly !== "Custom" && (
                    <span className="text-lg text-gray-500 dark:text-gray-400">/{billing === "monthly" ? "mo" : "yr"}</span>
                  )}
                </p>
                <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i}>✅ {feature}</li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className={`w-full rounded-xl transition ${
                    plan.highlighted
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  {plan.highlighted ? "Get Started" : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
