import React from "react";
import Tooltip from "@/components/UiComponents/Tooltip";
import { Lightbulb } from "lucide-react";

const PCAInsights: React.FC<any> = (props) => (
  // TODO: Use { pcaResult, selectedPCs } when implementing insights logic
  <div className="bg-primary/5 rounded-xl p-4 mt-4 flex items-center gap-2">
    <h4 className="font-semibold flex items-center gap-1">
      Insights
      <Tooltip content="See how much variance each principal component captures, and what it means for your data.">
        <span tabIndex={0} className="text-yellow-500 cursor-pointer">
          <Lightbulb size={16} />
        </span>
      </Tooltip>
    </h4>
    <div className="text-gray-600 ml-2">[PCA insights and explanations]</div>
  </div>
);

export default PCAInsights; 