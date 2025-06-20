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
import { Switch } from "@/components/ui/switch";

type AdvancedOptionsType = 'rotation-translation' | 'iteration-initial-vector' | 'both';

type MatrixInputProps = {
  onSubmit: (params: {
    matrix: number[][];
    rotation?: { x: number; y: number; z: number };
    translation?: { x: number; y: number; z: number };
    max_iter?: number;
    initial_vector?: number[];
  }) => void;
  initialMatrix?: Matrix;
  initialSize?: number;
  advancedOptions?: AdvancedOptionsType;
};

export const MatrixInput: React.FC<MatrixInputProps> = ({
  onSubmit,
  initialMatrix,
  initialSize = DEFAULT_MATRIX_SIZE,
  advancedOptions = 'both',
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
  const [maxIter, setMaxIter] = useState(10);
  const [initialVector, setInitialVector] = useState<string>(
    Array(size).fill('1').join(', ')
  );
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  // Helper booleans for which advanced options to show
  const showRotationTranslation = advancedOptions === 'rotation-translation' || advancedOptions === 'both';
  const showIterationInitialVector = advancedOptions === 'iteration-initial-vector' || advancedOptions === 'both';

  useEffect(() => {
    if (initialMatrix) {
      setMatrix(initialMatrix);
      setSize(initialMatrix.length);
    } else {
      setMatrix(createEmptyMatrix(size));
    }
    setInitialVector(Array(size).fill('1').join(', '));
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

  const handleInitialVectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialVector(e.target.value);
  };

  const handleMaxIterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxIter(Number(e.target.value));
  };

  const getNumericInitialVector = () => {
    return initialVector
      .split(',')
      .map((v) => Number(v.trim()))
      .map((num) => (isNaN(num) ? 1 : num));
  };

  const handleSubmit = () => {
    onSubmit({
      matrix: getNumericMatrix(),
      rotation,
      translation,
      max_iter: maxIter,
      initial_vector: getNumericInitialVector(),
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
      {showRotationTranslation && size >= 3 && (
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

      {/* Toggle for advanced fields */}
      {showIterationInitialVector && (
        <div className="flex items-center gap-2 my-2">
          <Switch
            checked={showAdvancedFields}
            onCheckedChange={setShowAdvancedFields}
            id="toggle-advanced-fields"
          />
          <label htmlFor="toggle-advanced-fields" className="font-medium select-none cursor-pointer text-xs">
            Show advanced options (iterations, initial vector)
          </label>
        </div>
      )}

      {/* Advanced fields for power method (iterations, initial vector) */}
      {showIterationInitialVector && showAdvancedFields && (
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <label className="font-semibold mb-1 text-xs">Max Iterations</label>
            <input
              type="number"
              min={1}
              value={maxIter}
              onChange={handleMaxIterChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold mb-1 text-xs">Initial Vector (comma separated)</label>
            <input
              type="text"
              value={initialVector}
              onChange={handleInitialVectorChange}
              className="w-full border rounded px-2 py-1"
              placeholder={Array(size).fill('1').join(', ')}
            />
          </div>
        </div>
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
