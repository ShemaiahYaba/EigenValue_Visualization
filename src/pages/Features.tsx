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
    <div className="flex flex-col justify-center items-center">
      <div className="py-6">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="mx-auto my-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-gray-50">
            Where are you heading to today?
          </p>
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
