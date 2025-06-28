import React, { useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
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
import ProfileInitials from "@/components/UiComponents/ProfileInitials";

const Navbar: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [spin, setSpin] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setSpin(true);
    setSettingsOpen((prev) => !prev);
    setTimeout(() => setSpin(false), 600); // duration matches animation
  };

  const handleLogout = async () => {
    setSettingsOpen(false);
    if (auth && auth.logout) {
      await auth.logout();
      navigate("/"); // Redirect to home or login page after logout
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!settingsOpen) return;
    const handleClick = (e: MouseEvent) => {
      const menu = document.getElementById("settings-dropdown");
      if (menu && !menu.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [settingsOpen]);

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
          <Link to="/features/made-easy" className="group">
            <AcademicCapIcon className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          <Link to="/features/concepts" className="group">
            <CubeIcon className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          <Link to="/features/pca-intro" className="group">
            <SquaresPlusIcon className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          <Link to="/features/numerical-methods" className="group">
            <CalculatorIcon className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          <Link to="/features/matrix-playground" className="group">
            <TbMatrix className="h-7 w-7 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" />
          </Link>
        </div>

        {/* Right: Profile, Theme, Settings */}
        <div className="flex items-center space-x-4 relative">
          <ThemeSwitcher />
          <Link to="/features" className="group">
            <HomeIcon className="h-7 w-7 text-black hover:text-gray-500 dark:text-gray-400 dark:hover:text-white" />
          </Link>
          {/* Settings Dropdown */}
          <button
            onClick={handleSettingsClick}
            className="relative group focus:outline-none"
            aria-label="Settings"
          >
            <TbSettings
              className={`h-7 w-7 text-black hover:text-gray-500 dark:text-gray-400 dark:hover:text-white transition-transform ${
                spin ? "animate-spin" : ""
              }`}
            />
          </button>
          {settingsOpen && (
            <div
              id="settings-dropdown"
              className="absolute right-0 top-12 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50 py-2"
            >
              <Link
                to="/features/settings"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setSettingsOpen(false)}
              >
                Update User Information
              </Link>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          {/* Profile Image */}
          <div>
            <ProfileInitials />
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
