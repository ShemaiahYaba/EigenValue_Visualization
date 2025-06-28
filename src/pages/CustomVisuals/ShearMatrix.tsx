import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Graph3D from "@/components/GraphingTools/Graph3D";

const ShearMatrix: React.FC = () => {
  const [mode, setMode] = useState<'2D'|'3D'>('2D');
  const [shear2D, setShear2D] = useState({ x: 0, y: 0 }); // x = horizontal shear, y = vertical shear
  const [shear3D, setShear3D] = useState({ xy: 0, xz: 0, yx: 0, yz: 0, zx: 0, zy: 0 });
  const navigate = useNavigate();

  // Build shear matrix
  const matrix = mode === '2D'
    ? [
        [1, shear2D.x],
        [shear2D.y, 1]
      ]
    : [
        [1, shear3D.xy, shear3D.xz],
        [shear3D.yx, 1, shear3D.yz],
        [shear3D.zx, shear3D.zy, 1]
      ];

  // Basis vectors after shear
  const basisVectors = mode === '2D'
    ? [
        [matrix[0][0], matrix[1][0]], // sheared [1, 0]
        [matrix[0][1], matrix[1][1]]  // sheared [0, 1]
      ]
    : [
        [matrix[0][0], matrix[1][0], matrix[2][0]], // sheared [1, 0, 0]
        [matrix[0][1], matrix[1][1], matrix[2][1]], // sheared [0, 1, 0]
        [matrix[0][2], matrix[1][2], matrix[2][2]]  // sheared [0, 0, 1]
      ];

  const handleReset = () => {
    setShear2D({ x: 0, y: 0 });
    setShear3D({ xy: 0, xz: 0, yx: 0, yz: 0, zx: 0, zy: 0 });
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
          <h2 className="text-2xl font-bold mb-4">Shear Matrix Visualization</h2>
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
          <span className="font-semibold">Set Shear Factors:</span>
          {mode === '2D' ? (
            <div className="flex flex-col gap-2">
              <div>
                <label className="block text-xs text-gray-600">Horizontal Shear (X direction)</label>
                <input
                  type="number"
                  value={shear2D.x}
                  onChange={e => setShear2D(s => ({ ...s, x: parseFloat(e.target.value) || 0 }))}
                  className="w-20 p-1 border rounded text-center"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Vertical Shear (Y direction)</label>
                <input
                  type="number"
                  value={shear2D.y}
                  onChange={e => setShear2D(s => ({ ...s, y: parseFloat(e.target.value) || 0 }))}
                  className="w-20 p-1 border rounded text-center"
                  step="any"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-gray-600">XY Shear</label>
                <input
                  type="number"
                  value={shear3D.xy}
                  onChange={e => setShear3D(s => ({ ...s, xy: parseFloat(e.target.value) || 0 }))}
                  className="w-16 p-1 border rounded text-center"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-gray-600">XZ Shear</label>
                <input
                  type="number"
                  value={shear3D.xz}
                  onChange={e => setShear3D(s => ({ ...s, xz: parseFloat(e.target.value) || 0 }))}
                  className="w-16 p-1 border rounded text-center"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-gray-600">YX Shear</label>
                <input
                  type="number"
                  value={shear3D.yx}
                  onChange={e => setShear3D(s => ({ ...s, yx: parseFloat(e.target.value) || 0 }))}
                  className="w-16 p-1 border rounded text-center"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-gray-600">YZ Shear</label>
                <input
                  type="number"
                  value={shear3D.yz}
                  onChange={e => setShear3D(s => ({ ...s, yz: parseFloat(e.target.value) || 0 }))}
                  className="w-16 p-1 border rounded text-center"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-gray-600">ZX Shear</label>
                <input
                  type="number"
                  value={shear3D.zx}
                  onChange={e => setShear3D(s => ({ ...s, zx: parseFloat(e.target.value) || 0 }))}
                  className="w-16 p-1 border rounded text-center"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-gray-600">ZY Shear</label>
                <input
                  type="number"
                  value={shear3D.zy}
                  onChange={e => setShear3D(s => ({ ...s, zy: parseFloat(e.target.value) || 0 }))}
                  className="w-16 p-1 border rounded text-center"
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
            <span className="font-semibold">Shear Matrix:</span>
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
                          {val.toFixed(3)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            <b>Shear Matrix:</b> Shear matrices slant shapes. A horizontal shear, for example, keeps horizontal lines horizontal (eigenvectors) but shifts points on them based on their vertical distance.
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

export default ShearMatrix; 