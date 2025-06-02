// FeaturesLayout.js
import React from "react";
import Navbar from "./Navbar"; // Adjust path
import { Outlet } from "react-router-dom";

const FeaturesLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This is where Features or sub-routes will render */}
      </main>
    </>
  );
};

export default FeaturesLayout;
