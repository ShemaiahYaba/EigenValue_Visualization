// components/UiComponents/FeatureCard.tsx

import React from "react";

interface FeatureCardProps {
  name: string;
  description: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  name,
  description,
  href,
  icon: Icon,
}) => {
  return (
    <a
      href={href}
      className="group relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-500"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="absolute right-4 bottom-4 opacity-0 translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0">
        <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
          Learn more →
        </span>
      </div>
    </a>
  );
};

export default FeatureCard;
