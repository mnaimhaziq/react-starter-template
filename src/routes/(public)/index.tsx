import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/(public)/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);

  return (
    <div className="relative w-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 overflow-hidden font-sans">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400 z-50 rounded-full"
        style={{ scaleX }}
      />

      {/* Hero */}
      <main className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20">
        <motion.section
          className="relative max-w-5xl text-center z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
            initial={{ scale: 0.97 }}
            animate={{ scale: isLoaded ? 1 : 0.97 }}
            transition={{ duration: 1.2 }}
          >
            Power Your Growth with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              SaaSify
            </span>
          </motion.h1>

          <motion.p
            className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            A clean, modern platform that helps teams launch, scale, and
            innovate — with simplicity at its core.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link
              to="/auth/register"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full shadow hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/demo"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Live Demo
            </Link>
          </motion.div>
        </motion.section>
      </main>

      {/* Features */}
      <section className="py-24 px-6 lg:px-12 bg-gray-50 dark:bg-neutral-950">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Built for Modern Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Lightning Fast",
                description: "Optimized workflows that keep your team moving forward.",
                icon: "⚡",
              },
              {
                title: "Insightful",
                description: "Beautiful dashboards that simplify complex data.",
                icon: "📈",
              },
              {
                title: "Reliable",
                description: "Secure, scalable, and always available for your business.",
                icon: "🛡️",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-center relative overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-lg text-black/70 mb-8">
            Join thousands of teams building the future with SaaSify.
          </p>
          <Link
            to="/auth/register"
            className="px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-all duration-300"
          >
            Start Free Trial
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
