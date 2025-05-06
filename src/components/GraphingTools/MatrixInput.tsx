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

  const [numPoints, setNumPoints] = useState(2); // columns
  const [numRows, setNumRows] = useState(2); // 2 for 2D, 3 for 3D

  // Ensure matrix resizes properly on dimension or point changes
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
    } catch (error) {
      console.error("Error:", error);
      alert("Transformation failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">Matrix Input</h2>

      <div className="flex gap-4 mb-6">
        <div>
          <label>Dimension:</label>
          <select
            value={numRows}
            onChange={(e) => setNumRows(Number(e.target.value))}
            className="ml-2 border border-gray-300 rounded px-2 py-1"
          >
            <option value={2}>2D</option>
            <option value={3}>3D</option>
          </select>
        </div>

        <div>
          <label>Points: {numPoints}</label>
          <input
            type="range"
            min="2"
            max="4"
            value={numPoints}
            onChange={(e) => setNumPoints(Number(e.target.value))}
            className="ml-2"
          />
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {matrix.slice(0, numRows).map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2">
            {row.slice(0, numPoints).map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                value={value}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, Number(e.target.value))
                }
                className="w-16 text-center border border-gray-300 rounded px-1"
              />
            ))}
          </div>
        ))}
        <p className="text-sm text-gray-500">
          Each column is a point in {numRows}D space.
        </p>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Rotation (degrees)</label>
        <div className="flex space-x-2">
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
              placeholder={`${axis}-axis`}
              className="w-24 border border-gray-300 rounded px-1"
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Translation</label>
        <div className="flex space-x-2">
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
              placeholder={`${axis}-axis`}
              className="w-24 border border-gray-300 rounded px-1"
            />
          ))}
        </div>
      </div>

      <button
        onClick={sendMatrixToPython}
        className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-600 transition"
      >
        Create Visualization
      </button>
    </div>
  );
};

export default MatrixInput;
