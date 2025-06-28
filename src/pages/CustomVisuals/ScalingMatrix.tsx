import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Graph3D from "@/components/GraphingTools/Graph3D";

const ScalingMatrix: React.FC = () => {
  const [mode, setMode] = useState<'2D'|'3D'>('2D');
  const [scale2D, setScale2D] = useState({ x: 1, y: 1 });
  const [scale3D, setScale3D] = useState({ x: 1, y: 1, z: 1 });
  const navigate = useNavigate();

  // Build scaling matrix
  const matrix = mode === '2D'
    ? [ [scale2D.x, 0], [0, scale2D.y] ]
    : [ [scale3D.x, 0, 0], [0, scale3D.y, 0], [0, 0, scale3D.z] ];

  // Basis vectors after scaling
  const basisVectors = mode === '2D'
    ? [ [scale2D.x, 0], [0, scale2D.y] ]
    : [ [scale3D.x, 0, 0], [0, scale3D.y, 0], [0, 0, scale3D.z] ];

  const handleReset = () => {
    setScale2D({ x: 1, y: 1 });
    setScale3D({ x: 1, y: 1, z: 1 });
  };

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
          <h2 className="text-2xl font-bold mb-4">Scaling Matrix Visualization</h2>
          <div className="flex gap-2 mb-2">
            <button
              className={`px-3 py-1 rounded ${mode==='2D' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setMode('2D')}
            >2D</button>
            <button
              className={`px-3 py-1 rounded ${mode==='3D' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setMode('3D')}
            >3D</button>
          </div>
          <span className="font-semibold">Set Scaling Factors:</span>
          {mode === '2D' ? (
            <div className="flex gap-2">
              <div>
                <label className="block text-xs text-gray-600">X</label>
                <input
                  type="number"
                  value={scale2D.x}
                  onChange={e => setScale2D(s => ({ ...s, x: parseFloat(e.target.value) }))}
                  className="w-16 p-1 border rounded text-center"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Y</label>
                <input
                  type="number"
                  value={scale2D.y}
                  onChange={e => setScale2D(s => ({ ...s, y: parseFloat(e.target.value) }))}
                  className="w-16 p-1 border rounded text-center"
                  step="any"
                />
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <div>
                <label className="block text-xs text-gray-600">X</label>
                <input
                  type="number"
                  value={scale3D.x}
                  onChange={e => setScale3D(s => ({ ...s, x: parseFloat(e.target.value) }))}
                  className="w-14 p-1 border rounded text-center"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Y</label>
                <input
                  type="number"
                  value={scale3D.y}
                  onChange={e => setScale3D(s => ({ ...s, y: parseFloat(e.target.value) }))}
                  className="w-14 p-1 border rounded text-center"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Z</label>
                <input
                  type="number"
                  value={scale3D.z}
                  onChange={e => setScale3D(s => ({ ...s, z: parseFloat(e.target.value) }))}
                  className="w-14 p-1 border rounded text-center"
                  step="any"
                />
              </div>
            </div>
          )}
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition w-fit"
          >
            Reset
          </button>
          <div className="flex flex-col gap-4 mt-4">
            <span className="font-semibold">Scaling Matrix:</span>
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
            <b>Scaling Matrix:</b> Scaling matrices enlarge or reduce vectors and shapes. Uniform scaling affects all directions equally. Non-uniform scaling stretches or squashes along specific axes (eigenvectors), with scaling factors as eigenvalues.
          </div>
        </div>
      </div>
      {/* Right Panel: Visualization */}
      <div className="w-[65%] h-full flex justify-center items-center bg-gray-50 overflow-hidden">
        {mode === '2D' ? (
          <Graph2D
            mode="vector"
            vectors={basisVectors}
            currentStep={1}
          />
        ) : (
          <Graph3D
            vectors={basisVectors}
            axisLabels={['X', 'Y', 'Z']}
          />
        )}
      </div>
    </div>
  );
};

export default ScalingMatrix;
