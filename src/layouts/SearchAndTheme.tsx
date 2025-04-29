import React from "react";
import ThemeSwitcher from "@/components/UiComponents/ThemeSwitcher";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchAndTheme: React.FC = () => {
  return (
    <div className="hidden lg:md:sm:flex items-center lg:md:sm:gap-x-2 lg:flex-1 lg:justify-end bg-gray-50 dark:bg-gray-800 max-w-fit">
      <ThemeSwitcher />
      <div className="rounded-3xl p-1 outline outline-gray-200 dark:outline-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-light text-xs lg:md:sm:flex items-center gap-x-2">
        <MagnifyingGlassIcon className="w-2 h-2 text-gray-500 dark:text-gray-400" />
        Ctrl+K<span className="sr-only">Search</span>
      </div>
    </div>
  );
};
