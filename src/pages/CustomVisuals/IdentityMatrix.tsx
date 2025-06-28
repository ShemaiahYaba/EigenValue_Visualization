import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Graph3D from "@/components/GraphingTools/Graph3D";

const generateIdentityMatrix = (size: number): number[][] => {
  return Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
  );
};

const IdentityMatrix: React.FC = () => {
  const [size, setSize] = useState(2);
  const navigate = useNavigate();
  const matrix = generateIdentityMatrix(size);

  // Generate basis vectors for visualization
  const getBasisVectors = () => {
    if (size === 2) {
      return [
        [matrix[0][0], matrix[1][0]], // [1, 0]
        [matrix[0][1], matrix[1][1]], // [0, 1]
      ];
    } else if (size === 3) {
      return [
        [matrix[0][0], matrix[1][0], matrix[2][0]], // [1, 0, 0]
        [matrix[0][1], matrix[1][1], matrix[2][1]], // [0, 1, 0]
        [matrix[0][2], matrix[1][2], matrix[2][2]], // [0, 0, 1]
      ];
    } else {
      return [
        [matrix[0][0], matrix[1][0], matrix[2][0]], // [1, 0, 0, 0] (first 3 components)
        [matrix[0][1], matrix[1][1], matrix[2][1]], // [0, 1, 0, 0] (first 3 components)
        [matrix[0][2], matrix[1][2], matrix[2][2]], // [0, 0, 1, 0] (first 3 components)
      ];
    }
  };

  const basisVectors = getBasisVectors();

  return (
    <div className="w-full flex overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Left Panel: Controls */}
      <div className="w-[35%] h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <button
            onClick={() => navigate('/features/concepts')}
            className="mb-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition w-fit"
          >
            ← More visualizations
          </button>
          <h2 className="text-2xl font-bold mb-4">Identity Matrix Visualization</h2>
          
          <div className="flex flex-col gap-4">
            <span className="font-semibold">Select Matrix Size:</span>
            <div className="flex gap-2">
              <select
                value={size}
                onChange={e => setSize(Number(e.target.value))}
                className="px-3 py-2 border rounded flex-1"
              >
                <option value={2}>2x2</option>
                <option value={3}>3x3</option>
                <option value={4}>4x4</option>
              </select>
             
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-semibold">Identity Matrix:</span>
            <div className="flex justify-center">
              <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                  {matrix.map((row, i) => (
                    <tr key={i}>
                      {row.map((val, j) => (
                        <td
                          key={j}
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px 12px",
                            textAlign: "center"
                          }}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-gray-500 text-sm">
            <b>Identity Matrix:</b> This matrix leaves all vectors unchanged. 
            It's the "do nothing" transformation where every vector maps to itself.
            {size >= 3 && " 3x3 and 4x4 matrices are shown in 3D mode."}
          </div>
        </div>
      </div>

      {/* Right Panel: Visualization */}
      <div className="w-[65%] h-full flex justify-center items-center bg-gray-50 overflow-hidden">
        {size === 2 ? (
          <Graph2D
            mode="vector"
            vectors={basisVectors}
            currentStep={1}
          />
        ) : (
          <Graph3D
            vectors={basisVectors}
            axisLabels={size === 3 ? ['X', 'Y', 'Z'] : ['X', 'Y', 'Z']}
          />
        )}
      </div>
    </div>
  );
};

export default IdentityMatrix;