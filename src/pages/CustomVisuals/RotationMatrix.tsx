import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Graph3D from "@/components/GraphingTools/Graph3D";

const RotationMatrix: React.FC = () => {
  const [mode, setMode] = useState<'2D'|'3D'>('2D');
  const [angle2D, setAngle2D] = useState(0);
  const [angle3D, setAngle3D] = useState(0);
  const [axis3D, setAxis3D] = useState<'x'|'y'|'z'>('z');
  const navigate = useNavigate();

  // Convert degrees to radians
  const toRadians = (degrees: number) => degrees * Math.PI / 180;

  // Build rotation matrix
  const matrix = mode === '2D'
    ? (() => {
        const rad = toRadians(angle2D);
        return [
          [Math.cos(rad), -Math.sin(rad)],
          [Math.sin(rad), Math.cos(rad)]
        ];
      })()
    : (() => {
        const rad = toRadians(angle3D);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        if (axis3D === 'x') {
          return [
            [1, 0, 0],
            [0, cos, -sin],
            [0, sin, cos]
          ];
        } else if (axis3D === 'y') {
          return [
            [cos, 0, sin],
            [0, 1, 0],
            [-sin, 0, cos]
          ];
        } else { // z-axis
          return [
            [cos, -sin, 0],
            [sin, cos, 0],
            [0, 0, 1]
          ];
        }
      })();

  // Basis vectors after rotation
  const basisVectors = mode === '2D'
    ? [
        [matrix[0][0], matrix[1][0]], // rotated [1, 0]
        [matrix[0][1], matrix[1][1]]  // rotated [0, 1]
      ]
    : [
        [matrix[0][0], matrix[1][0], matrix[2][0]], // rotated [1, 0, 0]
        [matrix[0][1], matrix[1][1], matrix[2][1]], // rotated [0, 1, 0]
        [matrix[0][2], matrix[1][2], matrix[2][2]]  // rotated [0, 0, 1]
      ];

  const handleReset = () => {
    setAngle2D(0);
    setAngle3D(0);
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
          <h2 className="text-2xl font-bold mb-4">Rotation Matrix Visualization</h2>
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
          <span className="font-semibold">Set Rotation Angle (degrees):</span>
          {mode === '2D' ? (
            <input
              type="number"
              value={angle2D}
              onChange={e => setAngle2D(parseFloat(e.target.value) || 0)}
              className="w-20 p-1 border rounded text-center"
              step="any"
            />
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="number"
                value={angle3D}
                onChange={e => setAngle3D(parseFloat(e.target.value) || 0)}
                className="w-20 p-1 border rounded text-center"
                step="any"
              />
              <div>
                <span className="text-sm text-gray-600">Rotation Axis:</span>
                <div className="flex gap-2 mt-1">
                  <button
                    className={`px-2 py-1 rounded text-xs ${axis3D === 'x' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setAxis3D('x')}
                  >X</button>
                  <button
                    className={`px-2 py-1 rounded text-xs ${axis3D === 'y' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setAxis3D('y')}
                  >Y</button>
                  <button
                    className={`px-2 py-1 rounded text-xs ${axis3D === 'z' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setAxis3D('z')}
                  >Z</button>
                </div>
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
            <span className="font-semibold">Rotation Matrix:</span>
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
            <b>Rotation Matrix:</b> Rotation matrices pivot vectors and shapes around the origin. In 2D, most rotations don't have real eigenvectors (unless 0° or 180°), but in 3D, the axis of rotation is an eigenvector with eigenvalue 1.
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

export default RotationMatrix; 