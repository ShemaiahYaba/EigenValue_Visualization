import React, { useEffect, useState } from "react";
import { useMatrix } from "@/hooks/useMatrix";

const MatrixInput: React.FC = () => {
  const {
    matrix,
    setMatrix,
    setTransformedMatrix,
    rotation,
    setRotation,
    translation,
    setTranslation,
  } = useMatrix();

  const [numPoints, setNumPoints] = useState(2);
  const [numRows, setNumRows] = useState(2);

  useEffect(() => {
    const newMatrix = Array.from({ length: 3 }, (_, i) =>
      Array.from({ length: numPoints }, (_, j) => matrix[i]?.[j] ?? 0)
    );
    setMatrix(newMatrix);
  }, [numPoints, numRows, matrix, setMatrix]);

  const handleInputChange = (row: number, col: number, value: number) => {
    const updated = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setMatrix(updated);
  };

  const sendMatrixToPython = async () => {
    try {
      const response = await fetch("https://mlab-uezm.onrender.com/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix, rotation, translation }),
      });
      if (!response.ok) throw new Error("Failed to send matrix");
      const data = await response.json();
      setTransformedMatrix(data.transformed);
      alert("Matrix transformed successfully");
    } catch {
      alert("Transformation failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 text-xs w-full max-w-xs">
      <h2 className="text-base font-semibold mb-2">Matrix Input</h2>
      <div className="flex gap-2 mb-2">
        <label className="flex items-center gap-1">
          Dim:
          <select
            value={numRows}
            onChange={(e) => setNumRows(Number(e.target.value))}
            className="border rounded px-1 py-0.5 text-xs"
          >
            <option value={2}>2D</option>
            <option value={3}>3D</option>
          </select>
        </label>
        <label className="flex items-center gap-1">
          Pts:
          <input
            type="range"
            min="2"
            max="4"
            value={numPoints}
            onChange={(e) => setNumPoints(Number(e.target.value))}
            className="w-16"
          />
          {numPoints}
        </label>
      </div>
      <div className="space-y-1 mb-2">
        {matrix.slice(0, numRows).map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1">
            {row.slice(0, numPoints).map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                value={value}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, Number(e.target.value))
                }
                className="w-10 text-center border rounded px-0.5 py-0.5"
              />
            ))}
          </div>
        ))}
        <p className="text-[10px] text-gray-500">
          Columns = points in {numRows}D
        </p>
      </div>
      <div className="mb-2 w-full">
        <label className="block font-semibold mb-0.5">Rotation</label>
        <div className="flex space-x-1">
          {["x", "y", "z"].slice(0, numRows).map((axis) => (
            <input
              key={axis}
              type="number"
              value={rotation[axis as keyof typeof rotation]}
              onChange={(e) =>
                setRotation((prev) => ({
                  ...prev,
                  [axis]: Number(e.target.value),
                }))
              }
              placeholder={axis}
              className="w-12 border rounded px-0.5 py-0.5"
            />
          ))}
        </div>
      </div>
      <div className="mb-2 w-full">
        <label className="block font-semibold mb-0.5">Translation</label>
        <div className="flex space-x-1">
          {["x", "y", "z"].slice(0, numRows).map((axis) => (
            <input
              key={axis}
              type="number"
              value={translation[axis as keyof typeof translation]}
              onChange={(e) =>
                setTranslation((prev) => ({
                  ...prev,
                  [axis]: Number(e.target.value),
                }))
              }
              placeholder={axis}
              className="w-12 border rounded px-0.5 py-0.5"
            />
          ))}
        </div>
      </div>
      <button
        onClick={sendMatrixToPython}
        className="px-3 py-1 bg-black text-white rounded hover:bg-gray-600 transition text-xs"
      >
        Visualize
      </button>
    </div>
  );
};

export default MatrixInput;
