import React, { useState } from "react";
import MatrixInput from "@/components/GraphingTools/Matirx/MatrixInput";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Insights from "@/components/UiComponents/Insights";
import { useMatrix } from "@/hooks/useMatrix";
import { runPowerMethod } from "@/services/matrixServices";
import IterationSlider from "@/components/GraphingTools/IterationSlider";

interface Results {
  eigenvalues: number[];
  vectors: number[][];
  true_max_eigenvalue: number;
}

// Adjust this value to match your navbar's height in px
const NAVBAR_HEIGHT = 64;

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

  // Only show insights if there is a visualization (results and at least one eigenvalue/vector)
  const showInsights =
    !!results &&
    Array.isArray(results.eigenvalues) &&
    results.eigenvalues.length > 0 &&
    Array.isArray(results.vectors) &&
    results.vectors.length > 0;

  return (
    <div
      className="w-full flex overflow-hidden"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        maxHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      {/* Left Panel: 1/5 width, scrollable */}
      <div className="w-[35%] h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-2">
          {/* Matrix Input on top */}
          <div className="mb-4">
            <MatrixInput onSubmit={handleSubmit} />
          </div>
          {/* Insights Panel below */}
          {errorInsight && (
            <div className="mb-4">
              <Insights
                insights={[{ title: "Error", description: errorInsight }]}
              />
            </div>
          )}
          {showInsights && (
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
          )}
        </div>
      </div>
      {/* Right Panel: 4/5 width, fills available height */}
      <div
        className="w-[65%] flex flex-col justify-center items-center relative bg-gray-50"
        style={{
          height: "100%",
        }}
      >
        <Graph2D
          mode="eigenvalue"
          eigenvalues={results?.eigenvalues}
          currentStep={currentStep}
          trueEigenvalues={
            results?.true_max_eigenvalue !== undefined
              ? [results.true_max_eigenvalue]
              : []
          }
          height={undefined} // Let Graph2D fill parent height
        />
        {results && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <IterationSlider
              maxSteps={results.vectors.length}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NumericalMethodsInner;
