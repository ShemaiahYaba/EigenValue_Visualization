import React, { useState, useMemo } from "react";
import MatrixInput from "@/components/GraphingTools/Matirx/MatrixInput";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Insights from "@/components/UiComponents/Insights";

import { runPowerMethod } from "@/services/matrixServices";
import IterationSlider from "@/components/GraphingTools/IterationSlider";

interface  Results {
  eigenvalues: number[];
  vectors: number[][];
  true_max_eigenvalue: number;
}

// Adjust this value to match your navbar's height in px
const NAVBAR_HEIGHT = 64;

const NumericalMethodsInner: React.FC = () => {
  
  const [results, setResults] = useState<Results | null>(null);
  const [, setIterations] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errorInsight, setErrorInsight] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showIterationModal, setShowIterationModal] = useState(false);

  const handleSubmit = async ({
    matrix,
    max_iter,
    initial_vector,
    use_random,
  }: {
    matrix: number[][];
    max_iter?: number;
    initial_vector?: number[];
    use_random?: boolean;
  }) => {
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
        },
        max_iter,
        undefined,
        initial_vector,
        use_random
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

  // Error metric calculation
  const errorStats = useMemo(() => {
    if (!results) return [];
    const { eigenvalues, vectors, true_max_eigenvalue } = results;
    const stats = [];
    for (let i = 0; i < eigenvalues.length; i++) {
      const eigenvalue = eigenvalues[i];
      const prevEigenvalue = i > 0 ? eigenvalues[i - 1] : null;
      const eigenvector = vectors[i];
      const prevEigenvector = i > 0 ? vectors[i - 1] : null;
      // Eigenvalue error
      const eigenvalueError = prevEigenvalue !== null ? Math.abs(eigenvalue - prevEigenvalue) : null;
      // Eigenvector error (Euclidean norm)
      let eigenvectorError = null;
      if (prevEigenvector) {
        eigenvectorError = Math.sqrt(
          eigenvector.reduce((sum, v, idx) => sum + Math.pow(v - prevEigenvector[idx], 2), 0)
        );
      }
      // Error to true eigenvalue
      const trueError = true_max_eigenvalue !== undefined ? Math.abs(eigenvalue - true_max_eigenvalue) : null;
      stats.push({
        iteration: i + 1,
        eigenvalue: eigenvalue,
        eigenvalueError,
        eigenvectorError,
        trueError,
        eigenvector,
      });
    }
    return stats;
  }, [results]);

  // Table components
  const IterationTable = ({ stats }: { stats: any[] }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs md:text-sm border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 border">Iteration</th>
            <th className="px-2 py-1 border">Eigenvalue</th>
            <th className="px-2 py-1 border">Eigenvector</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((row, i) => (
            <tr key={i} className="even:bg-gray-50">
              <td className="px-2 py-1 border text-center">{row.iteration}</td>
              <td className="px-2 py-1 border text-center">{row.eigenvalue.toFixed(6)}</td>
              <td className="px-2 py-1 border text-center">[{row.eigenvector.map((v: number) => v.toFixed(4)).join(", ")}]</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ErrorStatsTable = ({ stats }: { stats: any[] }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs md:text-sm border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 border">Iteration</th>
            <th className="px-2 py-1 border">Eigenvalue Change<br/><span className='font-mono'>|λₙ - λₙ₋₁|</span></th>
            <th className="px-2 py-1 border">Eigenvector Change<br/><span className='font-mono'>||vₙ - vₙ₋₁||</span></th>
            <th className="px-2 py-1 border">Error to True Eigenvalue<br/><span className='font-mono'>|λₙ - λ<sub>true</sub>|</span></th>
          </tr>
        </thead>
        <tbody>
          {stats.map((row, i) => (
            <tr key={i} className="even:bg-gray-50">
              <td className="px-2 py-1 border text-center">{row.iteration}</td>
              <td className="px-2 py-1 border text-center">{row.eigenvalueError !== null ? row.eigenvalueError.toExponential(3) : "-"}</td>
              <td className="px-2 py-1 border text-center">{row.eigenvectorError !== null ? row.eigenvectorError.toExponential(3) : "-"}</td>
              <td className="px-2 py-1 border text-center">{row.trueError !== null ? row.trueError.toExponential(3) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Modal component
  const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative" onClick={e => e.stopPropagation()}>
          <button className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500" onClick={onClose}>&times;</button>
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <div className="max-h-[60vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    );
  };

  // Determine if iteration table should be modal (e.g., for 4D+)
  const showIterationAsModal = results && results.vectors[0]?.length > 3;

  // Error tips
  const errorTips = (
    <div className="mt-4 text-xs text-gray-700 space-y-2">
      <div><b>|λₙ - λₙ₋₁|</b>: Change in eigenvalue estimate between iterations (convergence indicator).</div>
      <div><b>||vₙ - vₙ₋₁||</b>: Euclidean distance between eigenvector estimates (convergence of direction).</div>
      <div><b>|λₙ - λ<sub>true</sub>|</b>: Difference from the true dominant eigenvalue (accuracy indicator).</div>
    </div>
  );

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
            <MatrixInput onSubmit={handleSubmit} advancedOptions="iteration-initial-vector" />
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
            <>
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
              <div className="mt-4">
                {showIterationAsModal ? (
                  <button
                    className="mb-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => setShowIterationModal(true)}
                  >
                    See iteration table
                  </button>
                ) : (
                  <IterationTable stats={errorStats} />
                )}
                <button
                  className="mt-2 px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
                  onClick={() => setShowErrorModal(true)}
                >
                  See error stats
                </button>
              </div>
            </>
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
        width={800}
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
      {/* Modals */}
      <Modal open={showErrorModal} onClose={() => setShowErrorModal(false)} title="Error Analysis Stats">
        <ErrorStatsTable stats={errorStats} />
        {errorTips}
      </Modal>
      <Modal open={showIterationModal} onClose={() => setShowIterationModal(false)} title="Iteration Table">
        <IterationTable stats={errorStats} />
      </Modal>
    </div>
  );
};

export default NumericalMethodsInner;
