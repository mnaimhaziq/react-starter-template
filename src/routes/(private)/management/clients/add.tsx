import type { FormField } from "@/components/reusable/reusableform"
import ReusableForm from "@/components/reusable/reusableform"
import { createFileRoute } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { z } from "zod"

export const Route = createFileRoute("/(private)/management/clients/add")({
  component: RouteComponent,
})

function RouteComponent() {
  const clientSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    company: z.string().optional(),
    phone: z.string().min(8, "Phone number too short"),
    industry: z.string().optional(),
  })

  const fields: FormField[] = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Jane Doe" },
    { name: "email", label: "Email", type: "email", placeholder: "jane@company.com" },
    { name: "company", label: "Company", type: "text", placeholder: "Acme Inc." },
    { name: "phone", label: "Phone Number", type: "text", placeholder: "+60123456789" },
    {
      name: "industry",
      label: "Industry",
      type: "select",
      options: [
        { value: "", label: "Select industry" },
        { value: "tech", label: "Technology" },
        { value: "finance", label: "Finance" },
        { value: "retail", label: "Retail" },
        { value: "other", label: "Other" },
      ],
    },
  ]

  const handleSubmit = (data: z.infer<typeof clientSchema>) => {
    console.log("New client:", data)
    // TODO: call API
  }

  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-10 bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Add Client
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fill out the details below to add a new client to your CRM.
        </p>
      </div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 max-w-2xl"
      >
        <ReusableForm
          schema={clientSchema}
          fields={fields}
          onSubmit={handleSubmit}
          submitButtonText="Save Client"
          className="space-y-6"
          submitButtonClassName="bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg"
        />
      </motion.div>
    </div>
  )
}
