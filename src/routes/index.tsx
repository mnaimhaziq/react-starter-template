import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "@tanstack/react-router";
import { NavigationBar } from "../components/shared/navigations/Navbar";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
          Welcome to Your React Starter
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl lg:text-2xl dark:text-gray-300">
          Build modern, scalable, and beautiful web applications with this
          powerful React template powered by Flowbite and Tailwind CSS.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            as={Link}
            to="/auth/register"
            color="blue"
            size="lg"
            className="transition-all duration-300 hover:bg-blue-700"
          >
            Get Started
          </Button>
          <Button
            as={Link}
            to="/auth/login"
            color="gray"
            size="lg"
            outline
            className="transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Login
          </Button>
        </div>
      </section>
    </main>
  );
}
