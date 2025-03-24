import React, { ReactNode } from "react";
import {
  AcademicCapIcon,
  CalculatorIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  children?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="h-full w-64 bg-gray-800 text-white flex flex-col items-center py-4">
      <div className="mb-8">
        <img src="path_to_mlab_logo" alt="MLab Logo" className="h-16 w-16" />
      </div>
      <div className="mb-8">
        <img
          src="path_to_profile_image"
          alt="User Profile"
          className="h-16 w-16 rounded-full"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <AcademicCapIcon className="h-8 w-8 text-white" />
        <CalculatorIcon className="h-8 w-8 text-white" />
        <CubeIcon className="h-8 w-8 text-white" />
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
