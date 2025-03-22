import { useState } from "react";
import axios from "axios";

const MatrixInput = ({
  setEigenData,
}: {
  setEigenData: (data: {
    eigenvalues: number[];
    eigenvectors: number[][];
  }) => void;
}) => {
  const [matrix, setMatrix] = useState([
    [1, 2],
    [3, 4],
  ]); // Default matrix

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/compute-eigen", {
        matrix,
      });
      setEigenData(response.data);
    } catch (error) {
      console.error("Error computing eigenvalues:", error);
    }
  };

  return (
    <div>
      <h2>Enter a 2x2 Matrix:</h2>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((val, colIndex) => (
            <input
              key={colIndex}
              type="number"
              value={val}
              onChange={(e) => {
                const newMatrix = [...matrix];
                newMatrix[rowIndex][colIndex] = parseFloat(e.target.value);
                setMatrix(newMatrix);
              }}
            />
          ))}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-red-300 rounded-2xl hover:bg-amber-100"
        >
          Compute Eigenvalues
        </button>
      </form>
    </div>
  );
};

export default MatrixInput;
