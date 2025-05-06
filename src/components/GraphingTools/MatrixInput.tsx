import React, { useState } from "react";
import { useMatrix } from "@/hooks/useMatrix";

// Utility to transpose a matrix: Nx3 → 3xN
const transpose = (m: number[][]) => m[0].map((_, i) => m.map((row) => row[i]));

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

  const [numPoints, setNumPoints] = useState(2); // N (columns), always 3 rows for 3D

  const handleSizeChange = (size: number) => {
    setNumPoints(size);
    const newMatrix = Array.from({ length: 3 }, (_, i) =>
      Array.from({ length: size }, (_, j) => matrix[i]?.[j] ?? 0)
    );
    setMatrix(newMatrix);
  };

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
        body: JSON.stringify({
          matrix: transpose(matrix), // Already 3xN in frontend now
          rotation,
          translation,
        }),
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
      <h2 className="text-xl font-semibold mb-2">3D Matrix Input</h2>

      <div className="mb-4">
        <label>Number of Points: {numPoints}</label>
        <input
          type="range"
          min="2"
          max="4"
          value={numPoints}
          onChange={(e) => handleSizeChange(Number(e.target.value))}
          className="ml-2"
        />
      </div>

      <div className="mb-4">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex mb-2">
            {row.map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                value={value}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, Number(e.target.value))
                }
                className="w-12 mr-2 border border-gray-300 rounded px-1"
              />
            ))}
          </div>
        ))}
        <p className="text-sm text-gray-500 mt-1">
          Each column represents a point in 3D space
        </p>
      </div>

      <div className="mb-4 space-y-2">
        <label className="block font-semibold">Rotation (degrees)</label>
        {["x", "y", "z"].map((axis) => (
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
            className="w-24 mr-2 border border-gray-300 rounded px-1"
          />
        ))}
      </div>

      <div className="mb-4 space-y-2">
        <label className="block font-semibold">Translation</label>
        {["x", "y", "z"].map((axis) => (
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
            className="w-24 mr-2 border border-gray-300 rounded px-1"
          />
        ))}
      </div>

      <button
        onClick={sendMatrixToPython}
        className="mt-4 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-500"
      >
        Create Visualization
      </button>
    </div>
  );
};

export default MatrixInput;
