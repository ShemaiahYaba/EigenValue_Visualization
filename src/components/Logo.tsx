import logoblack from "@/assets/logo.svg";
import logowhite from "@/assets/logowhite.svg";
import React from "react";
import { useTheme } from "@/hooks/useTheme";

const Logo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <a href="/" className="">
      <div className="flex items-center -ml-6 lg:md:sm:m-0 ">
        <img
          src={theme === "dark" ? logowhite : logoblack}
          alt="MLAB Logo"
          className="w-15"
        />
        <span className="text-black dark:text-white text-4xl font-[aquatico]">
          MLAB
        </span>
      </div>
    </a>
  );
};

export default Logo;
