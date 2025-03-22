import logoblack from "@/assets/logo.svg";
import logowhite from "@/assets/logowhite.svg";
import React from "react";
import { useTheme } from "@/hooks/useTheme";

const Logo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <a href="/" className="justify-start">
      <div className="flex items-center -ml-4 lg:md:sm:m-0 ">
        <img
          src={theme === "dark" ? logowhite : logoblack}
          alt="MLAB Logo"
          className="w-10 "
        />
        <span className="text-black -tracking-tighter dark:text-white text-xl font-[aquatico]">
          MLAB
        </span>
      </div>
    </a>
  );
};

export default Logo;
