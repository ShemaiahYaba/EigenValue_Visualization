import React, { useState } from "react";
import SignIn from "@/components/UiComponents/SignIn";
import SignUp from "@/components/UiComponents/SignUp";
import signup from "@/assets/illustrations/signup.svg";
import { motion, AnimatePresence } from "framer-motion";

const AuthForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-4xl flex flex-col md:flex-row bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
      >
        {/* Illustration Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-8"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={signup}
            className="h-auto w-full max-w-md"
            alt="Welcome illustration"
          />
        </motion.div>

        {/* Auth Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-8">
          {/* Tab Buttons */}
          <div className="flex justify-center">
            <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === "signin"
                    ? "bg-white dark:bg-gray-900 shadow-md text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => setActiveTab("signin")}
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === "signup"
                    ? "bg-white dark:bg-gray-900 shadow-md text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </motion.button>
            </div>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "signin" ? <SignIn /> : <SignUp />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;
