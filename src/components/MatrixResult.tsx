import React from "react";

interface MatrixResultsProps {
  matrixData: number[][] | null; // The matrix data to be passed to the component
  errorMessage: string | null; // Optional error message
}

const MatrixResults: React.FC<MatrixResultsProps> = ({
  matrixData,
  errorMessage,
}) => {
  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold">Transformed Matrix</h3>

      {/* Display error message if any */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      {/* If matrix data exists, display it in a table */}
      {matrixData ? (
        <table className="w-full border border-collapse border-gray-300">
          <tbody>
            {matrixData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-2 text-center border border-gray-300"
                  >
                    {value.toFixed(2)}{" "}
                    {/* Showing value with 2 decimal points */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transformation data available.</p>
      )}
    </div>
  );
};

export default MatrixResults;
