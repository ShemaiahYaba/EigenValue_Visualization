import React, { useState } from "react";
import GridTransformation2D from "@/components/GraphingTools/GridTransformation2D";
import GridTransformation3D from "@/components/GraphingTools/GridTransformation3D";
import { useNavigate } from "react-router-dom";

const preset2D = [
  { name: "Identity", matrix: [[1, 0], [0, 1]] },
  { name: "90° Rotation", matrix: [[0, -1], [1, 0]] },
  { name: "Reflection X", matrix: [[1, 0], [0, -1]] },
  { name: "Shear X", matrix: [[1, 1], [0, 1]] },
  { name: "Scale 2x", matrix: [[2, 0], [0, 2]] },
];
const preset3D = [
  { name: "Identity", matrix: [[1,0,0],[0,1,0],[0,0,1]] },
  { name: "Scale Z", matrix: [[1,0,0],[0,1,0],[0,0,2]] },
  { name: "Reflect XY", matrix: [[-1,0,0],[0,-1,0],[0,0,1]] },
  { name: "Shear XZ", matrix: [[1,0,1],[0,1,0],[0,0,1]] },
  { name: "Custom", matrix: [[1,0.5,0],[0,1,0.5],[0,0,1]] },
];

const defaultMatrix2D = [[1, 0.5], [0, 1]];
const defaultMatrix3D = [[1,0,0],[0,1,0],[0,0,1]];

const LinearTransformation: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'2D'|'3D'>('2D');
  const [matrix2D, setMatrix2D] = useState<number[][]>(defaultMatrix2D);
  const [matrix3D, setMatrix3D] = useState<number[][]>(defaultMatrix3D);

  // Handlers
  const handleMatrix2DChange = (row: number, col: number, value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    setMatrix2D((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = num;
      return next;
    });
  };
  const handleMatrix3DChange = (row: number, col: number, value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    setMatrix3D((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = num;
      return next;
    });
  };
  const handlePreset2D = (mat: number[][]) => setMatrix2D(mat.map(r => [...r]));
  const handlePreset3D = (mat: number[][]) => setMatrix3D(mat.map(r => [...r]));
  const handleReset = () => {
    setMatrix2D(defaultMatrix2D.map(r => [...r]));
    setMatrix3D(defaultMatrix3D.map(r => [...r]));
  };
  const handleNavigate = () => {
    navigate('/features/concepts#common-transformations');
  };

  return (
    <div className="w-full flex overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Left Panel: Controls */}
      <div className="w-[35%] h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <h2 className="text-2xl font-bold mb-4">Linear Transformation Visualization</h2>
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
          <span className="font-semibold">Edit Matrix A:</span>
          {mode === '2D' ? (
            <div className="grid grid-cols-2 gap-2">
              {[0, 1].map((row) =>
                [0, 1].map((col) => (
                  <input
                    key={`${row}-${col}`}
                    type="number"
                    value={matrix2D[row][col]}
                    onChange={(e) => handleMatrix2DChange(row, col, e.target.value)}
                    className="w-16 p-1 border rounded text-center"
                    step="any"
                  />
                ))
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => (
                  <input
                    key={`${row}-${col}`}
                    type="number"
                    value={matrix3D[row][col]}
                    onChange={(e) => handleMatrix3DChange(row, col, e.target.value)}
                    className="w-14 p-1 border rounded text-center"
                    step="any"
                  />
                ))
              )}
            </div>
          )}
          <span className="text-sm text-gray-500 mt-1">A = {mode==='2D' ? '[[a, b], [c, d]]' : '[[a, b, c], [d, e, f], [g, h, i]]'}</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {(mode==='2D'?preset2D:preset3D).map((preset) => (
              <button
                key={preset.name}
                className="px-2 py-1 rounded bg-gray-100 border hover:bg-blue-100 text-xs"
                onClick={() => (mode==='2D'?handlePreset2D(preset.matrix):handlePreset3D(preset.matrix))}
              >{preset.name}</button>
            ))}
          </div>
          <div className="flex flex-row gap-2">
            <button
              className="mt-2 px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
              onClick={handleReset}
            >Reset</button>
            <button
              className="mt-2 px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
              onClick={handleNavigate}
            >More Visualizations</button>
          </div>
          <div className="text-gray-500 text-sm mt-4 max-w-2xl text-center">
            <b>Tip:</b> Try different preset matrices or enter your own to see how the grid is transformed! In 3D, you can rotate the view with your mouse.
          </div>
        </div>
      </div>
      {/* Right Panel: Visualization */}
      <div className="w-[65%] h-full flex justify-center items-center bg-gray-50 overflow-hidden">
        {mode === '2D' ? (
          <GridTransformation2D matrix={matrix2D} width={600} height={400} />
        ) : (
          <GridTransformation3D matrix={matrix3D} width={600} height={400} />
        )}
      </div>
    </div>
  );
};

export default LinearTransformation;
