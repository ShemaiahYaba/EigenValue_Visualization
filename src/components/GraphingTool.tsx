import React from "react";
import { useState } from "react";

interface MatrixInputProps {
  onMatrixChange: (matrix: number[][]) => void;
}

const GraphingTool: React.FC = () => {
  const handleMatrixChange = (matrix: number[][]) => {
    alert("Matrix updated: " + JSON.stringify(matrix));
  };

  return (
    <div>
      <h1>Graphing Tool</h1>
      <MatrixInput onMatrixChange={handleMatrixChange} />
    </div>
  );
};

const MatrixInput: React.FC<MatrixInputProps> = ({ onMatrixChange }) => {
  const [matrix, setMatrix] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const handleInputChange = (row: number, col: number, value: string) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(updatedMatrix);
    onMatrixChange(updatedMatrix);
  };

  return (
    <div>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", marginBottom: "5px" }}>
          {row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              value={value}
              onChange={(e) =>
                handleInputChange(rowIndex, colIndex, e.target.value)
              }
              style={{
                width: "50px",
                marginRight: "5px",
                textAlign: "center",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Removed duplicate definition of GraphingTool
export default GraphingTool;
