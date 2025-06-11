import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMatrix } from "@/hooks/useMatrix";
import { initializeMatrix } from "@/services/matrixServices";

type MatrixInputProps = {
  onSubmit: (params: {
    matrix: number[][];
    rotation?: { x: number; y: number; z: number };
    translation?: { x: number; y: number; z: number };
  }) => void;
};

const AxisInputGroup: React.FC<{
  label: string;
  values: Record<"x" | "y" | "z", number>;
  onChange: (axis: "x" | "y" | "z", value: number) => void;
}> = ({ label, values, onChange }) => (
  <div className="mb-2 w-full">
    <label className="block font-semibold mb-0.5">{label}</label>
    <div className="flex space-x-1">
      {["x", "y", "z"].map((axis) => (
        <input
          key={axis}
          type="number"
          step="any"
          value={values[axis as "x" | "y" | "z"]}
          onChange={(e) =>
            onChange(axis as "x" | "y" | "z", Number(e.target.value))
          }
          placeholder={axis}
          className="w-12 border rounded px-1 py-0.5"
        />
      ))}
    </div>
  </div>
);

const MatrixInput: React.FC<MatrixInputProps> = ({ onSubmit }) => {
  const {
    matrix,
    setMatrix,
    rotation,
    setRotation,
    translation,
    setTranslation,
  } = useMatrix();

  const [size, setSize] = useState(2);

  // Initialize or resize matrix when size changes
  useEffect(() => {
    setMatrix((prev) => initializeMatrix(prev, size));
  }, [size, setMatrix]);

  const handleInputChange = (row: number, col: number, value: number) => {
    setMatrix((prevMatrix) =>
      prevMatrix.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? value : c))
      )
    );
  };

  const handleSubmit = () => {
    onSubmit({ matrix, rotation, translation });
  };

  const router = useLocation();
  const isMatrixPlayground = router.pathname === "/features/matrix-playground";
  const shouldShowTransformInputs =
    (size === 3 || size === 4) && isMatrixPlayground;

  return (
    <div className="flex flex-col items-center justify-center p-2 text-xs w-full max-w-xs">
      <h2 className="text-base font-semibold mb-2">Matrix Input</h2>

      {/* Size Selector */}
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

      {/* Matrix Input Grid */}
      <div className="space-y-1 mb-2">
        {matrix.slice(0, size).map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1">
            {row.slice(0, size).map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                step="any"
                value={value}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, Number(e.target.value))
                }
                className="w-14 text-center border rounded px-2 py-1.5"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Rotation / Translation Inputs */}
      {shouldShowTransformInputs && (
        <>
          <AxisInputGroup
            label="Rotation (degrees)"
            values={rotation}
            onChange={(axis, value) =>
              setRotation((prev) => ({ ...prev, [axis]: value }))
            }
          />
          <AxisInputGroup
            label="Translation"
            values={translation}
            onChange={(axis, value) =>
              setTranslation((prev) => ({ ...prev, [axis]: value }))
            }
          />
        </>
      )}

      {/* Submit Button */}

      <button
        onClick={handleSubmit}
        className="px-3 py-1 bg-black text-white rounded hover:bg-gray-600 transition text-xs"
      >
        Submit
      </button>
    </div>
  );
};

export default MatrixInput;
