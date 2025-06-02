import React, { useState } from "react";
import SignIn from "@/components/UiComponents/SignIn";
import SignUp from "@/components/UiComponents/SignUp";
import signup from "@/assets/illustrations/signup.svg";

const AuthForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60">
      <div className="w-full max-w-3xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl dark:bg-gray-900 overflow-hidden">
        {/* Illustration Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-gray-50 to-gray-200 ">
          <img src={signup} className="h-fit w-full" />
        </div>
        {/* Auth Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
            Welcome to Our Platform
          </h2>
          <div className="flex justify-center mb-8">
            <button
              className={`px-6 py-2 rounded-l-full font-medium transition-colors ${
                activeTab === "signin"
                  ? "bg-black text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
              onClick={() => setActiveTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`px-6 py-2 rounded-r-full font-medium transition-colors ${
                activeTab === "signup"
                  ? "bg-black text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>
          <div>{activeTab === "signin" ? <SignIn /> : <SignUp />}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
