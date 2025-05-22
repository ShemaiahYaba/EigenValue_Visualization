// app/features/page.tsx
"use client";

import React from "react";

import FeatureCard from "@/components/UiComponents/FeatureCard";
import { TbMatrix } from "react-icons/tb";
import { BsBook } from "react-icons/bs";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { BiAnalyse } from "react-icons/bi";
import { CiCalculator1 } from "react-icons/ci";

const featureSetOne = [
  {
    name: "EV-EV Made Easy",
    description:
      "Understand EigenValues & EigenVectors through First Principles Thinking",
    href: "/coming-soon",
    icon: BsBook,
  },
  {
    name: "EV-EV Properties & Concepts",
    description: "View some insightful visualizations",
    href: "/coming-soon",
    icon: FaCompressArrowsAlt,
  },
  {
    name: "Matrix Playground",
    description: "Visualize your own matrix and gain insights",
    href: "/matrix-playground",
    icon: TbMatrix,
  },
];

const featureSetTwo = [
  {
    name: "PCA",
    description: "Understand PCA concepts",
    href: "/coming-soon",
    icon: BiAnalyse,
  },
  {
    name: "Numerical Methods",
    description: "Visual Convergence of Numerical Computations of EigenValues",
    href: "/coming-soon",
    icon: CiCalculator1,
  },
];

const Features: React.FC = () => {
  return (
    <main className="min-h-screen py-12 graph-paper-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Where are you heading to today?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Dive into core concepts and interactive tools mastering eigenvalues
            and eigenvectors.
          </p>
        </header>

        {/* Core Concepts */}
        <section className="mb-16" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
            Core Concepts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureSetOne.map((feature, index) => (
              <FeatureCard
                key={index}
                name={feature.name}
                description={feature.description}
                href={feature.href}
                icon={feature.icon}
              />
            ))}
          </div>
        </section>

        {/* Advanced Tools */}
        <section data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
            Advanced Visualizations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featureSetTwo.map((feature, index) => (
              <FeatureCard
                key={index}
                name={feature.name}
                description={feature.description}
                href={feature.href}
                icon={feature.icon}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Features;
