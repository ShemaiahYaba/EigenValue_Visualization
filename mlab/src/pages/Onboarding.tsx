import React from "react";
import { useState } from "react";

const Onboarding: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } h-screen flex flex-col items-center justify-center`}
      >
        <h1 className="text-3xl font-bold mb-4">
          Welcome to the Onboarding Page
        </h1>
        <p className="mb-8">
          Please follow the instructions to complete your setup.
        </p>
        <h1 className="mb-8 text-9xl font-extralight italic">Satoshi</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </>
  );
};

export default Onboarding;
