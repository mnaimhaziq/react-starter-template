import { z } from "zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import ReusableForm, { type FormField } from "@/components/reusable/reusableform";
import { FaGoogle, FaApple } from "react-icons/fa";

// Schema for login form
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);
    navigate({ to: "/overview/dashboard" });
  };

  const loginFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ] as const satisfies FormField[];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl border border-gray-200/50 bg-white/80 px-8 py-10 shadow-2xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/70"
      >
        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Log in to continue your journey ✨
          </p>
        </motion.div>

        {/* Form */}
        <ReusableForm
          schema={loginSchema}
          fields={loginFields}
          onSubmit={handleLogin}
          submitButtonText="Login"
          className="space-y-6"
          submitButtonClassName="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        />

        {/* Forgot password */}
        <div className="mt-3 text-right">
          <a
            href="/auth/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Forgot password?
          </a>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <span className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></span>
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400">or continue with</span>
          <span className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></span>
        </div>

        {/* Social buttons */}
        <div className="flex flex-col space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <FaGoogle className=" text-lg" />
            <span className="font-medium">Continue with Google</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <FaApple className="text-black dark:text-white text-lg" />
            <span className="font-medium">Continue with Apple</span>
          </motion.button>
        </div>

        {/* Bottom link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          Don’t have an account?{" "}
          <a
            href="/auth/register"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Register
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
