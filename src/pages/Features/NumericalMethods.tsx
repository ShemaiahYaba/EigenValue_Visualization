import React, { useState } from "react";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Insights from "@/components/UiComponents/Insights";
import { MatrixProvider } from "@/contexts/MatrixProvider";
import { useMatrix } from "@/hooks/useMatrix";
import { runPowerMethod } from "@/services/matrixServices";

const MatrixInputWrapper = () => {
  const { matrix } = useMatrix();
  const [results, setResults] = useState<{
    eigenvalues: number[];
    vectors: number[][];
  } | null>(null);

  const handleSubmit = async () => {
    await runPowerMethod(
      matrix,
      (result) => {
        setResults(result);
        alert("Power Method completed");
      },
      () => alert("Power Method failed")
    );
  };

  return (
    <>
      <MatrixInput onSubmit={handleSubmit} />
      {results && (
        <div className="mt-4">
          <Insights
            insights={[
              {
                title: "Dominant Eigenvalue",
                description: `${results.eigenvalues.at(-1)?.toFixed(4)}`,
              },
              {
                title: "Final Eigenvector",
                description: `[${results.vectors
                  .at(-1)
                  ?.map((v) => v.toFixed(4))
                  .join(", ")}]`,
              },
            ]}
          />
        </div>
      )}
    </>
  );
};

const NumericalMethods: React.FC = () => {
  return (
    <MatrixProvider>
      <div className="h-full w-full overflow-hidden">
        <div className="h-full w-full overflow-hidden flex">
          {/* Control Panel */}
          <div className="w-[22%]">
            <div className="h-full p-4 bg-white border border-gray-300 shadow-xl backdrop-blur-md">
              <MatrixInputWrapper />
            </div>
          </div>

          {/* Graph Display */}
          <div className="w-[78%] flex justify-center items-center overflow-hidden">
            <Graph2D />
          </div>
        </div>
      </div>
    </MatrixProvider>
  );
};

export default NumericalMethods;
