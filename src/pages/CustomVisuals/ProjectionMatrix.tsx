import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Graph3D from "@/components/GraphingTools/Graph3D";

const ProjectionMatrix: React.FC = () => {
  const [mode, setMode] = useState<'2D'|'3D'>('2D');
  const [type2D, setType2D] = useState<'x-axis'|'y-axis'|'line'|'custom'>('x-axis');
  const [type3D, setType3D] = useState<'xy-plane'|'yz-plane'|'xz-plane'|'line'|'custom'>('xy-plane');
  const [angle, setAngle] = useState(45);
  const navigate = useNavigate();

  // Convert degrees to radians
  const toRadians = (degrees: number) => degrees * Math.PI / 180;

  // Build projection matrix
  const matrix = mode === '2D'
    ? (() => {
        switch (type2D) {
          case 'x-axis':
            return [[1, 0], [0, 0]];
          case 'y-axis':
            return [[0, 0], [0, 1]];
          case 'line':
            const rad = toRadians(angle);
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            return [
              [cos * cos, cos * sin],
              [cos * sin, sin * sin]
            ];
          case 'custom':
            // Oblique projection matrix
            return [[0.5, 0.5], [0.5, 0.5]];
          default:
            return [[1, 0], [0, 0]];
        }
      })()
    : (() => {
        switch (type3D) {
          case 'xy-plane':
            return [[1, 0, 0], [0, 1, 0], [0, 0, 0]];
          case 'yz-plane':
            return [[0, 0, 0], [0, 1, 0], [0, 0, 1]];
          case 'xz-plane':
            return [[1, 0, 0], [0, 0, 0], [0, 0, 1]];
          case 'line':
            const rad = toRadians(angle);
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            return [
              [cos * cos, cos * sin, 0],
              [cos * sin, sin * sin, 0],
              [0, 0, 0]
            ];
          case 'custom':
            // Projection onto a specific direction
            return [[0.25, 0.25, 0.5], [0.25, 0.25, 0.5], [0.5, 0.5, 1]];
          default:
            return [[1, 0, 0], [0, 1, 0], [0, 0, 0]];
        }
      })();

  // Basis vectors after projection
  const basisVectors = mode === '2D'
    ? [
        [matrix[0][0], matrix[1][0]], // projected [1, 0]
        [matrix[0][1], matrix[1][1]]  // projected [0, 1]
      ]
    : [
        [matrix[0][0], matrix[1][0], matrix[2][0]], // projected [1, 0, 0]
        [matrix[0][1], matrix[1][1], matrix[2][1]], // projected [0, 1, 0]
        [matrix[0][2], matrix[1][2], matrix[2][2]]  // projected [0, 0, 1]
      ];

  const handleReset = () => {
    setType2D('x-axis');
    setType3D('xy-plane');
    setAngle(45);
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
          <h2 className="text-2xl font-bold mb-4">Projection Matrix Visualization</h2>
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
          <span className="font-semibold">Projection Type:</span>
          {mode === '2D' ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-2 py-1 rounded text-xs ${type2D === 'x-axis' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType2D('x-axis')}
                >X-axis</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type2D === 'y-axis' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType2D('y-axis')}
                >Y-axis</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type2D === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType2D('line')}
                >Line</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type2D === 'custom' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType2D('custom')}
                >Custom</button>
              </div>
              {type2D === 'line' && (
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Line Angle (degrees)</label>
                  <input
                    type="number"
                    value={angle}
                    onChange={e => setAngle(parseFloat(e.target.value) || 0)}
                    className="w-20 p-1 border rounded text-center"
                    step="any"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-2 py-1 rounded text-xs ${type3D === 'xy-plane' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType3D('xy-plane')}
                >XY Plane</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type3D === 'yz-plane' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType3D('yz-plane')}
                >YZ Plane</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type3D === 'xz-plane' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType3D('xz-plane')}
                >XZ Plane</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type3D === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType3D('line')}
                >Line</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type3D === 'custom' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType3D('custom')}
                >Custom</button>
              </div>
              {type3D === 'line' && (
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Line Angle (degrees)</label>
                  <input
                    type="number"
                    value={angle}
                    onChange={e => setAngle(parseFloat(e.target.value) || 0)}
                    className="w-20 p-1 border rounded text-center"
                    step="any"
                  />
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition w-fit"
          >
            Reset
          </button>
          <div className="flex flex-col gap-4 mt-4">
            <span className="font-semibold">Projection Matrix:</span>
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
            <b>Projection Matrix:</b> Projection matrices 'cast shadows' of vectors onto a subspace (like a line or plane). They are idempotent (P²=P). Eigenvalues are 0 (for directions collapsed) or 1 (for directions within the subspace).
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

export default ProjectionMatrix; 