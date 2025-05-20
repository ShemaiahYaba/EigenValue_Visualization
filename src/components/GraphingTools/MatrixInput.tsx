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

  // Square matrix size: 2, 3 or 4
  const [size, setSize] = useState(2);

  // Initialize matrix on size change
  useEffect(() => {
    // Create a size x size matrix preserving existing values when possible
    setMatrix((prevMatrix) => {
      const newMatrix = Array.from({ length: size }, (_, row) =>
        Array.from({ length: size }, (_, col) => prevMatrix?.[row]?.[col] ?? 0)
      );
      return newMatrix;
    });
  }, [size, setMatrix]);

  // Immutable update of matrix cell
  const handleInputChange = (row: number, col: number, value: number) => {
    setMatrix((prevMatrix) =>
      prevMatrix.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? value : c))
      )
    );
  };

  // Send matrix and optional transforms to backend
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
      <h2 className="text-base font-semibold mb-2">Square Matrix Input</h2>
      <label className="flex items-center gap-2 mb-2">
        Size:
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="border rounded px-1 py-0.5 text-xs"
        >
          {[2, 3, 4].map((s) => (
            <option key={s} value={s}>
              {s} × {s}
            </option>
          ))}
        </select>
      </label>
      <div className="space-y-1 mb-2">
        {matrix.slice(0, size).map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1">
            {row.slice(0, size).map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                value={value}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, Number(e.target.value))
                }
                className="w-12 text-center border rounded px-1 py-0.5"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Optional: Show rotation and translation only for 3x3 or 4x4 matrices */}
      {(size === 3 || size === 4) && (
        <>
          <div className="mb-2 w-full">
            <label className="block font-semibold mb-0.5">
              Rotation (degrees)
            </label>
            <div className="flex space-x-1">
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
                  placeholder={axis}
                  className="w-12 border rounded px-1 py-0.5"
                />
              ))}
            </div>
          </div>
          <div className="mb-2 w-full">
            <label className="block font-semibold mb-0.5">Translation</label>
            <div className="flex space-x-1">
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
                  placeholder={axis}
                  className="w-12 border rounded px-1 py-0.5"
                />
              ))}
            </div>
          </div>
        </>
      )}

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
