"use client";

import React from "react";
import FeatureCard from "@/components/UiComponents/FeatureCard";
import { TbMatrix } from "react-icons/tb";
import { BsBook } from "react-icons/bs";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { BiAnalyse } from "react-icons/bi";
import { CiCalculator1 } from "react-icons/ci";

// -----------------------------
// Types
// -----------------------------
type Feature = {
  name: string;
  description: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
};

// -----------------------------
// Data
// -----------------------------
const coreConcepts: Feature[] = [
  {
    name: "EV-EV Made Easy",
    description:
      "Understand EigenValues & EigenVectors through First Principles Thinking",
    href: "/features/made-easy",
    icon: BsBook,
  },
  {
    name: "EV-EV Properties & Concepts",
    description: "View some insightful visualizations",
    href: "/features/concepts",
    icon: FaCompressArrowsAlt,
  },
  {
    name: "Matrix Playground",
    description: "Visualize your own matrix and gain insights",
    href: "/features/matrix-playground",
    icon: TbMatrix,
  },
];

const advancedTools: Feature[] = [
  {
    name: "PCA",
    description: "Understand PCA concepts",
    href: "/features/pca",
    icon: BiAnalyse,
  },
  {
    name: "Numerical Methods",
    description: "Visual Convergence of Numerical Computations of EigenValues",
    href: "/features/numerical-methods",
    icon: CiCalculator1,
  },
];

// -----------------------------
// Reusable Section Component
// -----------------------------
type FeatureCardSectionProps = {
  title: string;
  features: Feature[];
  cols?: string; // optional override for column layout
};

const FeatureCardSection: React.FC<FeatureCardSectionProps> = ({
  title,
  features,
  cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}) => (
  <section data-aos="fade-up" className="mb-16">
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
      {title}
    </h2>
    <div className={`grid ${cols} gap-6`}>
      {features.map((feature, index) => (
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
);

// -----------------------------
// Main Features Page
// -----------------------------
const Features: React.FC = () => {
  return (
    <main className="min-h-screen py-12 graph-paper-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Page Header */}
        <header className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Where are you heading to today?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Dive into core concepts and interactive tools mastering eigenvalues
            and eigenvectors.
          </p>
        </header>

        {/* Sections */}
        <FeatureCardSection title="Core Concepts" features={coreConcepts} />
        <FeatureCardSection
          title="Advanced Visualizations"
          features={advancedTools}
          cols="grid-cols-1 sm:grid-cols-2"
        />
      </div>
    </main>
  );
};

export default Features;
