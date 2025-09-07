import { z } from 'zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import ReusableForm, { type FormField } from '@/components/ui/reusableform';

// Schema for login form
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    console.log('Login data:', data);
    // TODO: Replace this with actual API call & auth validation
    // Example:
    // const response = await axios.post('/api/login', data);
    // if (response.status === 200) {
    //   navigate({ to: '/dashboard/overview' });
    // }

    // For now, just redirect after "login"
    navigate({ to: '/overview/dashboard' });
  };

  const loginFields = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
] as const satisfies FormField[];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black transition-colors duration-500">
      {/* Glassmorphic Card with animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-md rounded-2xl bg-white/80 dark:bg-gray-900/70 p-8 shadow-xl backdrop-blur-xl border border-gray-200/40 dark:border-gray-700/40"
      >
        {/* Title with animation */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Welcome Back ✨
        </motion.h2>

        {/* Form */}
        <ReusableForm
          schema={loginSchema}
          fields={loginFields}
          onSubmit={handleLogin}
          submitButtonText="Login"
          className="space-y-6"
          submitButtonClassName="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
        />

        {/* Bottom links */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          Don&apos;t have an account?{' '}
          <a
            href="/auth/register"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors"
          >
            Register
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}

// Define route
export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});
