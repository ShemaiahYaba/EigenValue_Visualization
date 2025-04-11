import React, { useState } from "react";

const MatrixInput: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState(2);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(2).fill(Array(2).fill(0))
  );

  const handleSizeChange = (size: number) => {
    setMatrixSize(size);
    const newMatrix = Array(size)
      .fill(0)
      .map((_, i) =>
        Array(size)
          .fill(0)
          .map((_, j) =>
            matrix[i] && matrix[i][j] !== undefined ? matrix[i][j] : 0
          )
      );
    setMatrix(newMatrix);
  };

  const handleInputChange = (row: number, col: number, value: number) => {
    const updatedMatrix = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setMatrix(updatedMatrix);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h2>Matrix Input</h2>
      <div>
        <label>
          Matrix Size: {matrixSize}x{matrixSize}
        </label>
        <input
          type="range"
          min="2"
          max="4"
          value={matrixSize}
          onChange={(e) => handleSizeChange(Number(e.target.value))}
        />
      </div>
      <div>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", marginBottom: "5px" }}>
            {row.map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                value={value}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, Number(e.target.value))
                }
                style={{ width: "50px", marginRight: "5px" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatrixInput;
