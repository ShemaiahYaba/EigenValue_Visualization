import React, { ReactNode } from "react";
import logo from "@/assets/logo.svg";
import logo1 from "@/assets/logowhite.svg";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {
  AcademicCapIcon,
  CalculatorIcon,
  CubeIcon,
  SquaresPlusIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { TbMatrix, TbSettings } from "react-icons/tb";

interface SidebarProps {
  children?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-20 bg-gray-50 dark:bg-gray-900 dark:text-white flex flex-col items-center py-6 shadow-lg">
        {/* Logo */}
        <a href="/" className="mb-6">
          <img src={logo} alt="MLab Logo" className="h-12 w-12 dark:hidden" />
          <img
            src={logo1}
            alt="MLab Logo"
            className="h-12 w-12 hidden dark:block"
          />
          <span className="sr-only">MLAB</span>
        </a>

        {/* Profile Image */}
        <div className="mb-6">
          <img
            src="path_to_profile_image"
            alt="User Profile"
            className="h-14 w-14 rounded-full object-cover border-2 border-gray-700"
          />
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-6">
          <a href="/ev-ev-made-easy" className="group">
            <AcademicCapIcon className="h-8 w-8 text-black hover:text-gray-700  dark:text-gray-400 dark:hover:text-white" />
          </a>
          <a href="/ev-ev-visuals" className="group">
            <CubeIcon className="h-8 w-8 text-black hover:text-gray-700  dark:text-gray-400 dark:hover:text-white" />
          </a>
          <a href="/pca" className="group">
            <SquaresPlusIcon className="h-8 w-8 text-black hover:text-gray-700  dark:text-gray-400 dark:hover:text-white" />
          </a>
          <a href="/numerical-methods" className="group">
            <CalculatorIcon className="h-8 w-8 text-black hover:text-gray-700  dark:text-gray-400 dark:hover:text-white" />
          </a>
          <a href="/matrix-playground" className="group">
            <TbMatrix className="h-8 w-8 text-black hover:text-gray-700  dark:text-gray-400 dark:hover:text-white" />
          </a>
        </nav>
        <div className="mt-auto flex flex-col items-center justify-center space-y-4">
          <ThemeSwitcher />
          <a href="/features" className="group">
            <HomeIcon className="h-8 w-8 text-black hover:text-gray-500 dark:text-gray-400 dark:hover:text-white" />
          </a>
          <a href="/features-settings" className="group">
            <TbSettings className="h-8 w-8 text-black hover:text-gray-500 r:bg-gray-100 dark:text-gray-400 dark:hover:text-white" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Sidebar;
