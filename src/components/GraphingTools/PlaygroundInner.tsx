import React, { useState } from "react";
import MatrixInput from "@/components/GraphingTools/Matirx/MatrixInput";
import Graph3D from "@/components/GraphingTools/Graph3D";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Insights from "@/components/UiComponents/Insights";
import { useMatrix } from "@/hooks/useMatrix";
import { sendMatrixTransform } from "@/services/matrixServices";
import { MatrixSubmissionPayload } from "@/types/matrixTypes";

// Adjust this value to match your navbar's height in px
const NAVBAR_HEIGHT = 64;

function getTransformedBasisVectors(matrix: number[][] | null): number[][] {
  if (!matrix || matrix.length !== 2 || matrix[0].length !== 2) return [];
  // Columns of the matrix are the images of [1,0] and [0,1]
  return [
    [matrix[0][0], matrix[1][0]], // image of [1,0]
    [matrix[0][1], matrix[1][1]], // image of [0,1]
  ];
}

const MatrixInputWrapper = () => {
  const { setTransformedMatrix } = useMatrix();

  const handleSubmit = async ({
    matrix,
    rotation,
    translation,
  }: MatrixSubmissionPayload) => {
    await sendMatrixTransform(
      matrix,
      rotation ?? { x: 0, y: 0, z: 0 },
      translation ?? { x: 0, y: 0, z: 0 },
      (transformed) => setTransformedMatrix(transformed),
      () => alert("Failed to transform matrix")
    );
  };

  return <MatrixInput onSubmit={handleSubmit} advancedOptions="rotation-translation" />;
};

const MatrixPlayground: React.FC = () => {
  const [is3D, setIs3D] = useState(true);
  const { transformedMatrix } = useMatrix();

  return (
    <div
      className="w-full flex overflow-hidden"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        maxHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      {/* Left Panel: 2/5 (40%), scrollable */}
      <div className="w-[35%] h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <MatrixInputWrapper />
          <button
            className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition w-full"
            onClick={() => setIs3D(!is3D)}
          >
            Toggle to {is3D ? "3D" : "2D"}
          </button>
          <Insights
            insights={[
              {
                title: "Matrix Properties",
                description: "Basic matrix information",
              },
            ]}
          />
        </div>
      </div>

      {/* Right Panel: 3/5 (60%), graph always centered */}
      <div className="w-[65%] h-full flex justify-center items-center bg-gray-50 overflow-hidden">
        {is3D ? (
          <Graph2D
            mode="vector"
            vectors={getTransformedBasisVectors(transformedMatrix)}
            currentStep={1}
          />
        ) : (
          <Graph3D />
        )}
      </div>
    </div>
  );
};

export default MatrixPlayground;
