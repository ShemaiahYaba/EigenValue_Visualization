// FeatureCard.tsx
import React from "react";

interface FeatureCardProps {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
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
      className="flex flex-col items-center justify-center px-24 py-10 bg-gray-100 rounded-lg shadow-md hover:shadow-lg"
    >
      <div className="text-4xl">
        <Icon />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-center">{name}</h3>
      <p className="mt-2 text-sm text-gray-600 text-center">{description}</p>
    </a>
  );
};

export default FeatureCard;
