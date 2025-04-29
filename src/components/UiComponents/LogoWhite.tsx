import logo from "@/assets/logowhite.svg";
import React from "react";

const Logo: React.FC = () => {
  return (
    <a href="/" className="">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="MLAB Logo" className="w-20" />
        <span className="text-gray-200 text-4xl font-[aquatico]">MLAB</span>
      </div>
    </a>
  );
};
export default Logo;
