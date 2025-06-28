import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Graph3D from "@/components/GraphingTools/Graph3D";

const ReflectionMatrix: React.FC = () => {
  const [mode, setMode] = useState<'2D'|'3D'>('2D');
  const [angle2D, setAngle2D] = useState(0); // angle of reflection line in degrees
  const [plane3D, setPlane3D] = useState<'xy'|'yz'|'xz'>('xy'); // reflection plane
  const navigate = useNavigate();

  // Convert degrees to radians
  const toRadians = (degrees: number) => degrees * Math.PI / 180;

  // Build reflection matrix
  const matrix = mode === '2D'
    ? (() => {
        const rad = toRadians(angle2D);
        const cos = Math.cos(2 * rad);
        const sin = Math.sin(2 * rad);
        return [
          [cos, sin],
          [sin, -cos]
        ];
      })()
    : (() => {
        // 3D reflection across coordinate planes
        if (plane3D === 'xy') {
          return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, -1]
          ];
        } else if (plane3D === 'yz') {
          return [
            [-1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
          ];
        } else { // xz plane
          return [
            [1, 0, 0],
            [0, -1, 0],
            [0, 0, 1]
          ];
        }
      })();

  // Basis vectors after reflection
  const basisVectors = mode === '2D'
    ? [
        [matrix[0][0], matrix[1][0]], // reflected [1, 0]
        [matrix[0][1], matrix[1][1]]  // reflected [0, 1]
      ]
    : [
        [matrix[0][0], matrix[1][0], matrix[2][0]], // reflected [1, 0, 0]
        [matrix[0][1], matrix[1][1], matrix[2][1]], // reflected [0, 1, 0]
        [matrix[0][2], matrix[1][2], matrix[2][2]]  // reflected [0, 0, 1]
      ];

  const handleReset = () => {
    setAngle2D(0);
    setPlane3D('xy');
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
          <h2 className="text-2xl font-bold mb-4">Reflection Matrix Visualization</h2>
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
          <span className="font-semibold">Reflection Parameters:</span>
          {mode === '2D' ? (
            <div>
              <label className="block text-xs text-gray-600 mb-1">Angle of Reflection Line (degrees)</label>
              <input
                type="number"
                value={angle2D}
                onChange={e => setAngle2D(parseFloat(e.target.value) || 0)}
                className="w-20 p-1 border rounded text-center"
                step="any"
              />
            </div>
          ) : (
            <div>
              <span className="text-sm text-gray-600">Reflection Plane:</span>
              <div className="flex gap-2 mt-1">
                <button
                  className={`px-2 py-1 rounded text-xs ${plane3D === 'xy' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setPlane3D('xy')}
                >XY Plane</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${plane3D === 'yz' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setPlane3D('yz')}
                >YZ Plane</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${plane3D === 'xz' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setPlane3D('xz')}
                >XZ Plane</button>
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
            <span className="font-semibold">Reflection Matrix:</span>
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
            <b>Reflection Matrix:</b> Reflection matrices flip vectors across a line (2D) or plane (3D). Vectors on the reflection line/plane are eigenvectors (eigenvalue 1); vectors perpendicular are also eigenvectors (eigenvalue -1).
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

export default ReflectionMatrix; 