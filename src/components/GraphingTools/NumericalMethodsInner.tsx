import React, { useState } from "react";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Insights from "@/components/UiComponents/Insights";
import { useMatrix } from "@/hooks/useMatrix";
import { runPowerMethod } from "@/services/matrixServices";

interface Results {
  eigenvalues: number[];
  vectors: number[][];
}

const NumericalMethodsInner: React.FC = () => {
  const { matrix } = useMatrix();
  const [results, setResults] = useState<Results | null>(null);
  const [iterations, setIterations] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      await runPowerMethod(
        matrix,
        (result: Results) => {
          setResults(result);
          setIterations((prev) => [...prev, result.vectors.at(-1) || []]);
          setCurrentStep(result.vectors.length - 1);
          alert("Power Method completed");
        },
        () => alert("Power Method failed")
      );
    } catch (error: unknown) {
      alert(
        `Unexpected error during power method: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  return (
    <div className="h-full w-full overflow-hidden flex">
      {/* Control Panel */}
      <div className="w-[22%] p-4 bg-white border border-gray-300 shadow-xl backdrop-blur-md">
        <MatrixInput onSubmit={handleSubmit} />
        {results && (
          <div className="mt-4 h-[calc(100vh-300px)] overflow-y-auto">
            <Insights
              insights={[
                {
                  title: "Dominant Eigenvalue",
                  description: results.eigenvalues.at(-1)?.toFixed(4) ?? "N/A",
                },
                {
                  title: "Final Eigenvector",
                  description: `[${
                    results.vectors
                      .at(-1)
                      ?.map((v) => v.toFixed(4))
                      .join(", ") ?? ""
                  }]`,
                },
              ]}
            />
          </div>
        )}
      </div>

      {/* Graph Display */}
      <div className="w-[78%] flex justify-center items-center overflow-hidden">
        <Graph2D
          vectors={iterations} // if that's what you're naming them
          mode="eigenvalue"
          currentStep={currentStep}
        />
      </div>
    </div>
  );
};

export default NumericalMethodsInner;
