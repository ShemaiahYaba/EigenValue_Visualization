import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Graph3D from "@/components/GraphingTools/Graph3D";

const OrthogonalMatrix: React.FC = () => {
  const [mode, setMode] = useState<'2D'|'3D'>('2D');
  const [type2D, setType2D] = useState<'identity'|'rotation'|'reflection'|'custom'>('identity');
  const [type3D, setType3D] = useState<'identity'|'rotation'|'reflection'|'custom'>('identity');
  const [angle, setAngle] = useState(45);
  const [reflectionAngle, setReflectionAngle] = useState(0);
  const navigate = useNavigate();

  // Convert degrees to radians
  const toRadians = (degrees: number) => degrees * Math.PI / 180;

  // Build orthogonal matrix
  const matrix = mode === '2D'
    ? (() => {
        switch (type2D) {
          case 'identity':
            return [[1, 0], [0, 1]];
          case 'rotation':
            const rad = toRadians(angle);
            return [
              [Math.cos(rad), -Math.sin(rad)],
              [Math.sin(rad), Math.cos(rad)]
            ];
          case 'reflection':
            const refRad = toRadians(reflectionAngle);
            const cos = Math.cos(2 * refRad);
            const sin = Math.sin(2 * refRad);
            return [[cos, sin], [sin, -cos]];
          case 'custom':
            // Example of another orthogonal matrix (Householder reflection)
            return [[0, 1], [1, 0]];
          default:
            return [[1, 0], [0, 1]];
        }
      })()
    : (() => {
        switch (type3D) {
          case 'identity':
            return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
          case 'rotation':
            const rad = toRadians(angle);
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            return [
              [cos, -sin, 0],
              [sin, cos, 0],
              [0, 0, 1]
            ];
          case 'reflection':
            // Reflection across XY plane
            return [[1, 0, 0], [0, 1, 0], [0, 0, -1]];
          case 'custom':
            // Example of another orthogonal matrix (permutation)
            return [[0, 1, 0], [0, 0, 1], [1, 0, 0]];
          default:
            return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        }
      })();

  // Basis vectors after transformation
  const basisVectors = mode === '2D'
    ? [
        [matrix[0][0], matrix[1][0]], // transformed [1, 0]
        [matrix[0][1], matrix[1][1]]  // transformed [0, 1]
      ]
    : [
        [matrix[0][0], matrix[1][0], matrix[2][0]], // transformed [1, 0, 0]
        [matrix[0][1], matrix[1][1], matrix[2][1]], // transformed [0, 1, 0]
        [matrix[0][2], matrix[1][2], matrix[2][2]]  // transformed [0, 0, 1]
      ];

  const handleReset = () => {
    setType2D('identity');
    setType3D('identity');
    setAngle(45);
    setReflectionAngle(0);
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
          <h2 className="text-2xl font-bold mb-4">Orthogonal Matrix Visualization</h2>
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
          <span className="font-semibold">Orthogonal Matrix Type:</span>
          {mode === '2D' ? (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  className={`px-2 py-1 rounded text-xs ${type2D === 'identity' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType2D('identity')}
                >Identity</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type2D === 'rotation' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType2D('rotation')}
                >Rotation</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type2D === 'reflection' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType2D('reflection')}
                >Reflection</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type2D === 'custom' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType2D('custom')}
                >Custom</button>
              </div>
              {type2D === 'rotation' && (
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Rotation Angle (degrees)</label>
                  <input
                    type="number"
                    value={angle}
                    onChange={e => setAngle(parseFloat(e.target.value) || 0)}
                    className="w-20 p-1 border rounded text-center"
                    step="any"
                  />
                </div>
              )}
              {type2D === 'reflection' && (
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Reflection Line Angle (degrees)</label>
                  <input
                    type="number"
                    value={reflectionAngle}
                    onChange={e => setReflectionAngle(parseFloat(e.target.value) || 0)}
                    className="w-20 p-1 border rounded text-center"
                    step="any"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  className={`px-2 py-1 rounded text-xs ${type3D === 'identity' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType3D('identity')}
                >Identity</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type3D === 'rotation' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType3D('rotation')}
                >Rotation</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type3D === 'reflection' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType3D('reflection')}
                >Reflection</button>
                <button
                  className={`px-2 py-1 rounded text-xs ${type3D === 'custom' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setType3D('custom')}
                >Custom</button>
              </div>
              {type3D === 'rotation' && (
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Rotation Angle (degrees)</label>
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
            <span className="font-semibold">Orthogonal Matrix:</span>
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
            <b>Orthogonal Matrix:</b> Orthogonal matrices preserve dot products, meaning they maintain lengths of vectors and angles between them. Rotations and reflections are key examples of orthogonal transformations.
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

export default OrthogonalMatrix; 