import React, { useState, useEffect, useMemo } from "react";

import PCADataInput from "@/components/PCA/PCADataInput";
import PCAVarianceChart from "@/components/PCA/PCAVarianceChart";
import PCAProjectionControls from "@/components/PCA/PCAProjectionControls";
import PCAInsights from "@/components/PCA/PCAInsights";
import { runPCA } from "@/services/matrixServices";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Graph3D from "@/components/GraphingTools/Graph3D";


const NAVBAR_HEIGHT = 64;

// --- Data Summary Table ---
const DataSummary: React.FC<{ data: number[][] }> = ({ data }) => {
  if (!data.length) return null;
  const n = data[0].length;
  const means = Array(n).fill(0);
  const stds = Array(n).fill(0);
  const mins = Array(n).fill(Infinity);
  const maxs = Array(n).fill(-Infinity);
  const missings = Array(n).fill(0);
  for (let j = 0; j < n; ++j) {
    const col = data.map(row => row[j]);
    means[j] = col.reduce((a, b) => a + b, 0) / col.length;
    stds[j] = Math.sqrt(col.reduce((a, b) => a + (b - means[j]) ** 2, 0) / col.length);
    mins[j] = Math.min(...col);
    maxs[j] = Math.max(...col);
    missings[j] = col.filter(v => isNaN(v)).length;
  }
  return (
    <div className="overflow-x-auto border rounded mb-2 bg-white">
      <table className="text-xs w-full">
        <thead>
          <tr>
            <th className="px-2 py-1 font-semibold border-b text-left">Statistic</th>
            {Array.from({ length: n }).map((_, j) => (
              <th key={j} className="px-2 py-1 font-semibold border-b text-center">Col {j + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 py-1 border-b font-semibold">Mean</td>
            {means.map((m, j) => <td key={j} className="px-2 py-1 border-b text-center">{m.toFixed(2)}</td>)}
          </tr>
          <tr>
            <td className="px-2 py-1 border-b font-semibold">Std</td>
            {stds.map((s, j) => <td key={j} className="px-2 py-1 border-b text-center">{s.toFixed(2)}</td>)}
          </tr>
          <tr>
            <td className="px-2 py-1 border-b font-semibold">Min</td>
            {mins.map((min, j) => <td key={j} className="px-2 py-1 border-b text-center">{min.toFixed(2)}</td>)}
          </tr>
          <tr>
            <td className="px-2 py-1 border-b font-semibold">Max</td>
            {maxs.map((max, j) => <td key={j} className="px-2 py-1 border-b text-center">{max.toFixed(2)}</td>)}
          </tr>
          <tr>
            <td className="px-2 py-1 border-b font-semibold">Missing</td>
            {missings.map((miss, j) => <td key={j} className="px-2 py-1 border-b text-center">{miss}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// --- Data Preview Table ---
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

// --- Main PCA Module ---
const PCAInner: React.FC = () => {
  const [data, setData] = useState<number[][]>([]);
  const [pcaResult, setPcaResult] = useState<any>(null);
  const [selectedPCs, setSelectedPCs] = useState(2);
  const [error, setError] = useState<string | null>(null);
    
  // Cumulative variance explained
  const cumulativeVariance = useMemo(() => {
    if (!pcaResult?.explained_variance_ratio) return 0;
    return pcaResult.explained_variance_ratio.slice(0, selectedPCs).reduce((a: number, b: number) => a + b, 0);
  }, [pcaResult, selectedPCs]);

  useEffect(() => {
    if (data.length > 0) {
      runPCA(
        data,
        (result) => {
          setPcaResult(result);
          setError(null);
        },
        (_err) => {
          setError("PCA failed. Please check your data.");
        }
      );
    }
  }, [data]);

  // --- Plot helpers ---
  const canShow3D = data[0]?.length >= 3 && selectedPCs >= 3;
  const canShow2D = selectedPCs === 2;

  // --- Projected Data for Graphs ---
  const projectedData = useMemo(() => {
    if (!pcaResult?.projected_data) return [];
    return pcaResult.projected_data.map((row: number[]) => row.slice(0, selectedPCs));
  }, [pcaResult, selectedPCs]);

  // --- Axis labels for Graphs ---
  const axisLabels = useMemo(() => {
    return Array.from({ length: selectedPCs }).map((_, i) => `PC${i + 1}`);
  }, [selectedPCs]);

  return (
    
    <div
      className="w-full flex flex-col items-center overflow-x-hidden relative"
      style={{
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`
      }}
    >
      <div className="w-full max-w-5xl flex flex-col">
      <div className="flex flex-col gap-4 p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">1. Upload or Paste Data</h2>
        <PCADataInput onData={setData} />
        <DataPreview data={data} />
        <DataSummary data={data} />
        <h2 className="text-lg font-bold mt-4 mb-2">2. Choose Number of Principal Components</h2>
        {data.length > 0 && pcaResult?.explained_variance_ratio && (
          <>
            <PCAProjectionControls
              maxPCs={data[0]?.length || 2}
              selectedPCs={selectedPCs}
              onChange={setSelectedPCs}
            />
            <div className="text-xs text-gray-700 mt-1">
              Cumulative variance explained: <b>{(cumulativeVariance * 100).toFixed(1)}%</b>
            </div>
          </>
        )}
        {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
        <div className="mt-4">
          <PCAVarianceChart
            explainedVariance={pcaResult?.explained_variance_ratio || []}
            selectedPCs={Array.from({ length: selectedPCs }, (_, i) => i)}
          />
        </div>
        <div className="mt-4">
          <PCAInsights pcaResult={pcaResult} selectedPCs={Array.from({ length: selectedPCs }, (_, i) => i)} />
        </div>
        </div>
        {/* Graphs Row */}
        <div className="w-full flex flex-col  gap-8 mt-8 justify-center items-stretch">
          {/* Original Data Plot */}
          <div className="flex-1 flex flex-col items-center bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="font-semibold mb-1">Original Data</div>
            {data[0]?.length === 2 && (
              <Graph2D
                vectors={data}
                mode="vector"
                currentStep={data.length - 1}
                width={800}
                height={600}
                eigenvalues={undefined}
                trueEigenvalues={undefined}
              />
            )}
            {data[0]?.length === 3 && (
              <Graph3D
                vectors={data}
                axisLabels={["Feature 1", "Feature 2", "Feature 3"]}
                showLegend={true}
                width={800}
                height={600}
              />
            )}
            {data[0]?.length > 3 && (
              <div className="text-xs text-gray-500">(Pairwise scatter plots for {'>'}3D coming soon)</div>
            )}
          </div>
          {/* Projected Data Plot */}
          <div className="flex-1 flex flex-col items-center bg-gray-50 rounded-lg p-4 shadow-sm mb-4">
            <div className="font-semibold mb-1">PCA-Projected Data</div>
            {canShow2D && (
              <Graph2D
                vectors={projectedData}
                mode="vector"
                currentStep={projectedData.length - 1}
                width={800}
                height={600}
                eigenvalues={undefined}
                trueEigenvalues={undefined}
              />
            )}
            {canShow3D && (
              <Graph3D
                vectors={projectedData}
                axisLabels={axisLabels}
                showLegend={true}
                width={800}
                height={600}
              />
            )}
            {!canShow2D && !canShow3D && (
              <div className="text-xs text-gray-500">(Select 2 or 3 PCs to view projection)</div>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default PCAInner;
