import React, { useState, useEffect } from "react";
import PCAIntroCard from "@/components/PCA/PCAIntroCard";
import PCADataInput from "@/components/PCA/PCADataInput";
import PCAScatterPlot from "@/components/PCA/PCAScatterPlot";
import PCAVarianceChart from "@/components/PCA/PCAVarianceChart";
import PCAProjectionControls from "@/components/PCA/PCAProjectionControls";
import PCAInsights from "@/components/PCA/PCAInsights";
import { runPCA } from "@/services/matrixServices";

const PCAModule: React.FC = () => {
  const [data, setData] = useState<number[][]>([]);
  const [pcaResult, setPcaResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPCs, setSelectedPCs] = useState(2);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      runPCA(
        data,
        (result) => {
          setPcaResult(result);
          setLoading(false);
        },
        () => setLoading(false)
      );
    }
  }, [data]);

  return (
    <div className="space-y-8 px-4 md:px-8">
      <PCAIntroCard />
      <PCADataInput onData={setData} />
      {data.length > 0 && (
        <>
          <PCAProjectionControls
            maxPCs={data[0]?.length || 2}
            selectedPCs={selectedPCs}
            onChange={setSelectedPCs}
          />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              {loading ? (
                <div className="text-center text-gray-500 py-12">Loading PCA...</div>
              ) : (
                <PCAScatterPlot
                  data={data}
                  pcaResult={pcaResult}
                  selectedPCs={selectedPCs}
                />
              )}
            </div>
            <div className="flex-1">
              <PCAVarianceChart
                explainedVariance={pcaResult?.explained_variance_ratio}
                selectedPCs={selectedPCs}
              />
              <PCAInsights pcaResult={pcaResult} selectedPCs={selectedPCs} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PCAModule;
