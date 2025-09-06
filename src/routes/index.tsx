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
import { NavigationBar } from "../components/navigations/navbar";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  

  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-screen bg-white   dark:bg-gray-900">
      
      <h1 className="dark:text-white text-gray-900 font-bold text-6xl">REACT STARTER TEMPLATE</h1>

    </main>
  );
}
