import React from "react";
import ThemeSwitcher from "@/components/UiComponents/ThemeSwitcher";

export const SearchAndTheme: React.FC = () => {
  return (
    <div className="hidden lg:md:sm:flex items-center lg:md:sm:gap-x-2 lg:flex-1 lg:justify-end bg-gray-50 dark:bg-gray-800 max-w-fit">
      <ThemeSwitcher />
    </div>
  );
};
