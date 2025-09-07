import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import ReusableForm, { type FormField } from '@/components/ui/reusableform';

// Define the schema for registration form using Zod
const registerSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

function RegisterPage() {
  const handleRegister = async (data: z.infer<typeof registerSchema>) => {
    console.log('Registration data:', data);
    // Example: await axios.post('/api/register', data);
  };

  const registerFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
    },
  ] as const satisfies FormField[];;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black transition-colors duration-500">
      {/* Glassmorphism Card with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-md rounded-2xl bg-white/80 dark:bg-gray-900/70 p-8 shadow-xl backdrop-blur-xl border border-gray-200/40 dark:border-gray-700/40"
      >
        {/* Title Animation */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Create an Account ✨
        </motion.h2>

        {/* Registration Form */}
        <ReusableForm
          schema={registerSchema}
          fields={registerFields}
          onSubmit={handleRegister}
          submitButtonText="Register"
          className="space-y-6"
          submitButtonClassName="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
        />

        {/* Login Redirect */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="text-purple-600 dark:text-purple-400 font-medium hover:underline transition-colors"
          >
            Login
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}

// Route Definition
export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
});