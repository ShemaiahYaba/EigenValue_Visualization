import React, { useState } from "react";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Insights from "@/components/UiComponents/Insights";
import { useMatrix } from "@/hooks/useMatrix";
import { runPowerMethod } from "@/services/matrixServices";
import IterationSlider from "@/components/GraphingTools/IterationSlider";

interface Results {
  eigenvalues: number[];
  vectors: number[][];
  true_max_eigenvalue: number; // <-- Add this line
}

const NumericalMethodsInner: React.FC = () => {
  const { matrix } = useMatrix();
  const [results, setResults] = useState<Results | null>(null);
  const [, setIterations] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errorInsight, setErrorInsight] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      await runPowerMethod(
        matrix,
        (result: Results) => {
          setResults(result);
          setIterations((prev) => [...prev, result.vectors.at(-1) || []]);
          setCurrentStep(result.vectors.length - 1);
          setErrorInsight(null);
          alert("Power Method completed");
        },
        (errMsg?: string) => {
          setErrorInsight(errMsg ? `Error: ${errMsg}` : "Power Method failed");
          alert("Power Method failed");
        }
      );
    } catch (error: unknown) {
      setErrorInsight(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
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

        {errorInsight && (
          <div className="mt-4">
            <Insights
              insights={[{ title: "Error", description: errorInsight }]}
            />
          </div>
        )}
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
        {results && (
          <IterationSlider
            maxSteps={results.vectors.length}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        )}
      </div>

      {/* Graph Display */}
      <div className="w-[78%] h-full flex justify-center items-center overflow-hidden">
        <Graph2D
          mode="eigenvalue"
          eigenvalues={results?.eigenvalues}
          currentStep={currentStep}
          trueEigenvalues={
            results?.true_max_eigenvalue !== undefined
              ? [results.true_max_eigenvalue]
              : []
          }
        />
      </div>
    </div>
  );
};

export default NumericalMethodsInner;
