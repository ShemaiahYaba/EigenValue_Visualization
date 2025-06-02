import React, { useState, ReactElement, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureCircle {
  id: string;
  title: string;
  icon: ReactElement;
  description: string;
  position: string;
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tooltipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const Hero: React.FC = (): ReactElement => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features: FeatureCircle[] = useMemo(
    () => [
      {
        id: "fundamentals",
        title: "Matrix Fundamentals",
        description: "Master the basics of matrix operations",
        position: "top-0 left-1/2 -translate-x-1/2",
        icon: (
          <svg
            className="w-12 h-12 transition-colors duration-200 text-blue-600 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        ),
      },
      {
        id: "visualization",
        title: "Data Visualization",
        description: "Visualize matrix transformations in real-time",
        position: "top-1/4 right-[5%]",
        icon: (
          <svg
            className="w-12 h-12 transition-colors duration-200 text-purple-600 dark:text-purple-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
          </svg>
        ),
      },
      // ... Add other features similarly
    ],
    []
  );

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariants}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="relative w-[800px] h-[800px] max-w-full">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className={`absolute ${feature.position}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onHoverStart={() => setActiveFeature(feature.id)}
            onHoverEnd={() => setActiveFeature(null)}
          >
            <div
              className="rounded-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center w-32 h-32 
                shadow-lg hover:shadow-xl dark:shadow-gray-700 cursor-pointer relative group
                transition-all duration-300 ease-in-out"
              role="button"
              tabIndex={0}
              aria-label={feature.title}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveFeature(feature.id);
                }
              }}
            >
              {feature.icon}

              <AnimatePresence>
                {activeFeature === feature.id && (
                  <motion.div
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute -bottom-16 bg-black dark:bg-white text-white dark:text-black 
                      rounded-lg p-3 text-sm w-48 text-center pointer-events-none shadow-xl"
                  >
                    <p className="font-semibold mb-1">{feature.title}</p>
                    <p className="text-xs opacity-90">{feature.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          variants={fadeInUpVariants}
          transition={{ delay: 0.5 }}
        >
          <h1 className="mb-6 font-[montez] text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 select-none">
            MatrixLAB
          </h1>
          <motion.p
            className="text-2xl md:text-3xl max-w-2xl mb-8 text-gray-700 dark:text-gray-300"
            variants={fadeInUpVariants}
            transition={{ delay: 0.7 }}
          >
            From{" "}
            <span className="italic font-[montez] text-blue-600 dark:text-blue-400 select-none">
              First Principles Thinking
            </span>{" "}
            to PCA Mastery.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
