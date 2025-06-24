import React from "react";
import Tooltip from "@/components/UiComponents/Tooltip";
import { Lightbulb } from "lucide-react";

type PCAInsightsProps = {
  pcaResult: {
    explained_variance_ratio: number[];  // e.g., [0.45, 0.3, 0.15, 0.1]
  };
  selectedPCs: number[];                 // e.g., [0, 1]
};

const getInsights = (variance: number[], selected: number[]): string[] => {
  if (!variance || selected.length === 0) return [];

  const selectedVars = selected.map(i => +(variance[i] * 100).toFixed(2));
  const total = selectedVars.reduce((a, b) => a + b, 0);

  const insights = [];

  if (selected.length === 1) {
    insights.push(
      `PC${selected[0] + 1} explains ${selectedVars[0]}% of the variance.`
    );
  } else {
    insights.push(
      `The selected ${selected.length} components explain a total of ${total.toFixed(2)}% of the variance.`
    );
    selected.forEach((i, idx) => {
      insights.push(`PC${i + 1} individually explains ${selectedVars[idx]}%.`);
    });
  }

  // Add a qualitative interpretation
  if (total >= 90) {
    insights.push("✅ These components capture almost all meaningful structure in your data.");
  } else if (total >= 75) {
    insights.push("⚠️ A good portion of the variance is captured, but consider adding more PCs.");
  } else {
    insights.push("🔍 The selected components may not represent the full structure. Try selecting more PCs.");
  }

  return insights;
};

const PCAInsights: React.FC<PCAInsightsProps> = ({ pcaResult, selectedPCs }) => {
  const insights = getInsights(pcaResult?.explained_variance_ratio || [], selectedPCs);

  return (
    <div className="bg-primary/5 rounded-xl p-4 mt-4">
      <h4 className="font-semibold flex items-center gap-2 mb-2">
        Insights
        <Tooltip content="See how much variance each principal component captures, and what it means for your data.">
          <span tabIndex={0} className="text-yellow-500 cursor-pointer">
            <Lightbulb size={16} />
          </span>
        </Tooltip>
      </h4>
      {insights.length > 0 ? (
        <ul className="text-gray-600 list-disc list-inside space-y-1 text-sm">
          {insights.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500 text-sm">Select at least one principal component to see insights.</div>
      )}
    </div>
  );
};

export default PCAInsights;
