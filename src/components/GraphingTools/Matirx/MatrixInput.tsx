import React, { useState, useEffect, useCallback } from "react";
import { MatrixCell } from "./matrix-cell";
import {
  createEmptyMatrix,
  MATRIX_SIZE_OPTIONS,
  DEFAULT_MATRIX_SIZE,
  type Matrix,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";

type MatrixInputProps = {
  onSubmit: (params: {
    matrix: number[][];
    rotation?: { x: number; y: number; z: number };
    translation?: { x: number; y: number; z: number };
  }) => void;
  initialMatrix?: Matrix;
  initialSize?: number;
};

export const MatrixInput: React.FC<MatrixInputProps> = ({
  onSubmit,
  initialMatrix,
  initialSize = DEFAULT_MATRIX_SIZE,
}) => {
  const [size, setSize] = useState(initialSize);
  // Store as string for robust input handling
  const [matrix, setMatrix] = useState<Matrix>(
    initialMatrix || createEmptyMatrix(initialSize)
  );
  const [rotation, setRotation] = useState<{ x: number; y: number; z: number }>(
    {
      x: 0,
      y: 0,
      z: 0,
    }
  );
  const [translation, setTranslation] = useState<{
    x: number;
    y: number;
    z: number;
  }>({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    if (initialMatrix) {
      setMatrix(initialMatrix);
      setSize(initialMatrix.length);
    } else {
      setMatrix(createEmptyMatrix(size));
    }
  }, [size, initialMatrix]);

  const handleSizeChange = (newSizeValue: string) => {
    const newSize = parseInt(newSizeValue, 10);
    setSize(newSize);
    setMatrix(createEmptyMatrix(newSize));
  };

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    setMatrix((prev) =>
      prev.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
          : row
      )
    );
  };

  const clearMatrix = useCallback(() => {
    setMatrix(createEmptyMatrix(size));
  }, [size]);

  const resetToDefault = useCallback(() => {
    setSize(DEFAULT_MATRIX_SIZE);
    setMatrix(createEmptyMatrix(DEFAULT_MATRIX_SIZE));
  }, []);

  // Convert matrix to numbers for submission, treating empty/invalid as 0
  const getNumericMatrix = () =>
    matrix.map((row) =>
      row.map((cell) => {
        const num = Number(cell);
        return isNaN(num) ? 0 : num;
      })
    );

  const handleSubmit = () => {
    onSubmit({
      matrix: getNumericMatrix(),
      rotation,
      translation,
    });
  };

  return (
    <div className="space-y-6 p-6 border rounded-lg shadow-lg bg-card max-w-lg mx-auto">
      <Label
        htmlFor="matrix-size-select"
        className="text-lg font-headline text-primary"
      >
        Matrix Size:
      </Label>
      <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-1">
          <Select value={size.toString()} onValueChange={handleSizeChange}>
            <SelectTrigger
              id="matrix-size-select"
              className="w-28 h-10 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            >
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {MATRIX_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}x{option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-1 flex-col">
          <Button
            variant="outline"
            onClick={clearMatrix}
            className="text-destructive border-destructive hover:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
          <Button variant="outline" onClick={resetToDefault}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
      </div>

      <div
        className="grid gap-1 sm:gap-1"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <MatrixCell
              key={`cell-${rowIndex}-${colIndex}`}
              value={cell}
              onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
              aria-label={`Matrix cell row ${rowIndex + 1} column ${
                colIndex + 1
              }`}
            />
          ))
        )}
      </div>
      <p className="text-sm text-muted-foreground font-body">
        Enter numerical values. For example: 1, -2.5, 0.
      </p>

      {/* Optional: Rotation/Translation Inputs */}
      {size >= 3 && (
        <>
          <div className="flex gap-4">
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
          </div>
        </>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full px-3 py-2 bg-black text-white rounded hover:bg-gray-600 transition text-base"
      >
        Submit
      </Button>
    </div>
  );
};

// AxisInputGroup reused from your original code, but can be further improved for string input if needed.
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
          className="w-12 text-center border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ))}
    </div>
  </div>
);

export default MatrixInput;
