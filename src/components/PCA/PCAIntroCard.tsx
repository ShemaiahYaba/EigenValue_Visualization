import React from "react";
import Tooltip from "@/components/UiComponents/Tooltip";
import { Lightbulb } from "lucide-react";

const PCAIntroCard: React.FC = () => (
  <div className="bg-primary/5 rounded-xl p-6 shadow flex items-center gap-4">
    <div>
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        What is PCA?
        <Tooltip content="PCA finds the directions (principal components) where your data varies the most, helping you simplify and visualize complex datasets.">
          <span tabIndex={0} className="text-yellow-500 cursor-pointer">
            <Lightbulb size={18} />
          </span>
        </Tooltip>
      </h2>
      <p className="text-base text-foreground/80">
        Principal Component Analysis (PCA) is a technique for reducing the dimensionality of data while preserving as much information as possible. It does this by finding new axes (principal components) that capture the most variance in your data.
      </p>
    </div>
  </div>
);

export default PCAIntroCard; 