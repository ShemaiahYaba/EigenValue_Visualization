import React from "react";
import PCAIntroCard from "@/components/PCA/PCAIntroCard";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const PCAIntro: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <PCAIntroCard />
        </div>
        <div className="flex-1">
          <HowToUseCard />
        </div>
      </div>
      <div className="flex justify-center">
        <Button variant="default" size="lg" 
        onClick={() => navigate("/features/pca")}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PCAIntro;

const HowToUseCard = () => (
  <div className="bg-primary/5 rounded-xl p-4 shadow text-sm mt-2">
    <b>How to use this tool:</b>
    <ol className="list-decimal ml-5 mt-1 space-y-1">
      <li>Upload or paste your data (rows = samples, columns = features).</li>
      <li>Choose how many principal components to keep.</li>
      <li>Explore the transformation and variance explained below.</li>
      <li>Hover over points for details. Use the legend to interpret axes.</li>
    </ol>
  </div>
);
