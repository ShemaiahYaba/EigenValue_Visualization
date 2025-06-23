import React, { useState, useEffect } from "react";
import PCAIntroCard from "@/components/PCA/PCAIntroCard";
import PCADataInput from "@/components/PCA/PCADataInput";
import PCAScatterPlot from "@/components/PCA/PCAScatterPlot";
import PCAVarianceChart from "@/components/PCA/PCAVarianceChart";
import PCAProjectionControls from "@/components/PCA/PCAProjectionControls";
import PCAInsights from "@/components/PCA/PCAInsights";
import { runPCA } from "@/services/matrixServices";

const SIDEBAR_WIDTH = "35%";
const MAIN_WIDTH = "65%";

const DataPreview: React.FC<{ data: number[][] }> = ({ data }) => {
  if (!data.length) return null;
  const maxCols = Math.min(6, data[0].length);
  const maxRows = Math.min(8, data.length);
  return (
    <div className="overflow-x-auto border rounded mb-2 bg-white">
      <table className="text-xs w-full">
        <thead>
          <tr>
            {Array.from({ length: maxCols }).map((_, j) => (
              <th key={j} className="px-2 py-1 font-semibold border-b">Col {j + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, maxRows).map((row, i) => (
            <tr key={i}>
              {row.slice(0, maxCols).map((cell, j) => (
                <td key={j} className="px-2 py-1 border-b text-center">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > maxRows && <div className="text-xs text-gray-500 px-2">...and {data.length - maxRows} more rows</div>}
    </div>
  );
};

const PCAModule: React.FC = () => {
  const [data, setData] = useState<number[][]>([]);
  const [pcaResult, setPcaResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPCs, setSelectedPCs] = useState(2);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      runPCA(
        data,
        (result) => {
          setPcaResult(result);
          setLoading(false);
          setError(null);
        },
        (err) => {
          setLoading(false);
          setError("PCA failed. Please check your data.");
        }
      );
    }
  }, [data]);

  return (
    <div className="w-full flex overflow-hidden" style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* Sidebar: Data input, preview, controls */}
      <div className="w-[35%] min-w-[320px] max-w-lg bg-white border-r border-gray-200 flex flex-col p-4 gap-4">
        <h2 className="text-lg font-bold mb-2">1. Upload or Paste Data</h2>
        <PCADataInput onData={setData} />
        <DataPreview data={data} />
        <h2 className="text-lg font-bold mt-4 mb-2">2. Choose Number of Principal Components</h2>
        {data.length > 0 && (
          <PCAProjectionControls
            maxPCs={data[0]?.length || 2}
            selectedPCs={selectedPCs}
            onChange={setSelectedPCs}
          />
        )}
        {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
        <div className="mt-4">
          <PCAIntroCard />
        </div>
      </div>
      {/* Main: Plot, variance chart, insights */}
      <div className="w-[65%] flex flex-col justify-center items-center relative bg-gray-50 p-6 gap-6">
        <h2 className="text-lg font-bold mb-2 self-start">3. Explore Results</h2>
        <div className="w-full flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center">
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
          <div className="flex-1 flex flex-col gap-4">
            <PCAVarianceChart
              explainedVariance={pcaResult?.explained_variance_ratio}
              selectedPCs={selectedPCs}
            />
            <PCAInsights pcaResult={pcaResult} selectedPCs={selectedPCs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCAModule;
