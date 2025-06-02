import React from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import logo1 from "@/assets/logowhite.svg";
import ThemeSwitcher from "@/components/UiComponents/ThemeSwitcher";
import {
  AcademicCapIcon,
  CalculatorIcon,
  CubeIcon,
  SquaresPlusIcon,
  HomeIcon,
} from "@heroicons/react/16/solid";
import { TbMatrix, TbSettings } from "react-icons/tb";

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-gray-50 dark:bg-gray-900 dark:text-white flex items-center justify-between px-6 py-3 shadow-lg">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="MLab Logo" className="h-10 w-10 dark:hidden" />
          <img
            src={logo1}
            alt="MLab Logo"
            className="h-10 w-10 hidden dark:block"
          />
          <span className="sr-only">MLAB</span>
        </Link>

        {/* Center: Navigation Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/made-easy" className="group">
            <AcademicCapIcon className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          <Link to="/concepts" className="group">
            <CubeIcon className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          <Link to="/pca" className="group">
            <SquaresPlusIcon className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          <Link to="/numerical-methods" className="group">
            <CalculatorIcon className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          <Link to="/matrix-playground" className="group">
            <TbMatrix className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
        </div>

        {/* Right: Profile, Theme, Settings */}
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          <Link to="/features" className="group">
            <HomeIcon className="h-7 w-7 text-black hover:text-gray-500 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          <Link to="/settings" className="group">
            <TbSettings className="h-7 w-7 text-black hover:text-gray-500 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          {/* Profile Image */}
          <div>
            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-700 text-lg font-bold text-gray-700 dark:text-white">
              JI
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
