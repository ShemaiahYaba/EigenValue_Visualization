import React from "react";
import ThemeSwitcher from "@/layouts/ThemeSwitcher";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchAndTheme: React.FC = () => {
  return (
    <div className="flex items-center gap-x-4 lg:md:sm:gap-x-10 lg:flex-1 lg:justify-end bg-gray-50 dark:bg-gray-800 max-w-fit">
      <ThemeSwitcher />
      <div className="rounded-3xl p-2 outline outline-gray-200 dark:outline-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-400 font-light text-sm/6 flex items-center gap-x-2">
        <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        Ctrl+K
        <span className="sr-only">Search</span>
      </div>
    </div>
  );
};
