import React, { useState } from "react";
import MatrixInput from "@/components/GraphingTools/Matirx/MatrixInput";
import Graph3D from "@/components/GraphingTools/Graph3D";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Insights from "@/components/UiComponents/Insights";
import { useMatrix } from "@/hooks/useMatrix";
import { sendMatrixTransform } from "@/services/matrixServices";
import { MatrixSubmissionPayload } from "@/types/matrixTypes";
import { create, all } from 'mathjs';

// Adjust this value to match your navbar's height in px
const NAVBAR_HEIGHT = 64;

const math = create(all);

function getTransformedBasisVectors(matrix: number[][] | null): number[][] {
  if (!matrix || matrix.length !== 2 || matrix[0].length !== 2) return [];
  // Columns of the matrix are the images of [1,0] and [0,1]
  return [
    [matrix[0][0], matrix[1][0]], // image of [1,0]
    [matrix[0][1], matrix[1][1]], // image of [0,1]
  ];
}

function getMatrixInsights(matrix: number[][] | null): { title: string; description: string }[] {
  if (!matrix || !Array.isArray(matrix) || !Array.isArray(matrix[0])) return [
    { title: 'Matrix', description: 'No matrix provided.' }
  ];
  const n = matrix.length;
  if (matrix.some(row => row.length !== n)) return [
    { title: 'Matrix', description: 'Matrix is not square.' }
  ];
  let insights: { title: string; description: string }[] = [];
  // Type
  if (n === 2 || n === 3 || n === 4) {
    const isIdentity = matrix.every((row, i) => row.every((v, j) => (i === j ? v === 1 : v === 0)));
    if (isIdentity) insights.push({ title: 'Type', description: 'Identity matrix (does not change vectors).' });
    else if (matrix.every((row, i) => row.every((v, j) => (i !== j ? v === 0 : true)))) insights.push({ title: 'Type', description: 'Diagonal matrix (scales axes independently).' });
    else if (matrix.every((row, i) => row.every((_, j) => matrix[i][j] === matrix[j][i]))) insights.push({ title: 'Type', description: 'Symmetric matrix.' });
    else insights.push({ title: 'Type', description: 'General matrix.' });
  }
  // Determinant
  let det = 'N/A';
  try { det = math.det(matrix).toFixed(4); } catch { }
  insights.push({ title: 'Determinant', description: String(det) });
  // Trace
  let trace = 'N/A';
  try { trace = math.trace(matrix).toFixed(4); } catch { }
  insights.push({ title: 'Trace', description: String(trace) });
  // Rank
  let rank = 'N/A';
  // mathjs may not have rank; skip or implement a simple fallback if needed
  insights.push({ title: 'Rank', description: rank });
  // Invertibility
  if (det !== 'N/A') {
    insights.push({ title: 'Invertible', description: Number(det) !== 0 ? 'Yes' : 'No (singular matrix)' });
  }
  // Area/Volume scaling
  if (n === 2) {
    if (det !== 'N/A') insights.push({ title: 'Area Scaling', description: `Scales area by ${det}` });
  } else if (n === 3) {
    if (det !== 'N/A') insights.push({ title: 'Volume Scaling', description: `Scales volume by ${det}` });
  } else if (n === 4) {
    if (det !== 'N/A') insights.push({ title: '4D Hypervolume Scaling', description: `Scales 4D volume by ${det}` });
  }
  // Effect on basis vectors
  for (let i = 0; i < n; ++i) {
    const basis = Array(n).fill(0); basis[i] = 1;
    const mapped = matrix.map(row => row.reduce((sum, v, j) => sum + v * basis[j], 0));
    insights.push({ title: `e${i + 1} maps to`, description: `[${mapped.map(x => x.toFixed(3)).join(', ')}]` });
  }
  // Eigenvalues (real only)
  try {
    const eig = math.eigs(matrix);
    if (eig && eig.values) {
      const eigArr = Array.isArray(eig.values) ? eig.values : Object.values(eig.values);
      const realEig = eigArr.filter((v: any) => Math.abs(v.im || 0) < 1e-8).map((v: any) => (v.re !== undefined ? v.re : v).toFixed(4));
      if (realEig.length > 0) insights.push({ title: 'Real Eigenvalues', description: realEig.join(', ') });
    }
  } catch { }
  return insights;
}

const MatrixInputWrapper = () => {
  const { setTransformedMatrix } = useMatrix();

  const handleSubmit = async ({
    matrix,
    rotation,
    translation,
  }: MatrixSubmissionPayload) => {
    await sendMatrixTransform(
      matrix,
      rotation ?? { x: 0, y: 0, z: 0 },
      translation ?? { x: 0, y: 0, z: 0 },
      (transformed) => setTransformedMatrix(transformed),
      () => alert("Failed to transform matrix")
    );
  };

  return <MatrixInput onSubmit={handleSubmit} advancedOptions="rotation-translation" />;
};

const MatrixPlayground: React.FC = () => {
  const [is3D, setIs3D] = useState(true);
  const { transformedMatrix } = useMatrix();

  const insights = getMatrixInsights(transformedMatrix);

  return (
    <div
      className="w-full flex overflow-hidden"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        maxHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      {/* Left Panel: 2/5 (40%), scrollable */}
      <div className="w-[35%] h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <MatrixInputWrapper />
          <button
            className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition w-full"
            onClick={() => setIs3D(!is3D)}
          >
            Toggle to {is3D ? "3D" : "2D"}
          </button>
          <Insights insights={insights} />
        </div>
      </div>

      {/* Right Panel: 3/5 (60%), graph always centered */}
      <div className="w-[65%] h-full flex justify-center items-center bg-gray-50 overflow-hidden">
        {is3D ? (
          <Graph2D
            mode="vector"
            vectors={getTransformedBasisVectors(transformedMatrix)}
            currentStep={1}
          />
        ) : (
          <Graph3D />
        )}
      </div>
    </div>
  );
};

export default MatrixPlayground;
