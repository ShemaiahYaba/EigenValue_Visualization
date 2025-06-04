import React, { useState } from "react";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
import Graph3D from "@/components/GraphingTools/Graph3D";
import Graph2D from "@/components/GraphingTools/Graph2D";
import Insights from "@/components/UiComponents/Insights";
import { MatrixProvider } from "@/contexts/MatrixProvider";
import { useMatrix } from "@/hooks/useMatrix";
import { sendMatrixTransform } from "@/services/matrixServices";
import { MatrixSubmissionPayload } from "@/types/matrixTypes";

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

  return <MatrixInput onSubmit={handleSubmit} />;
};

const MatrixPlayground: React.FC = () => {
  const [is3D, setIs3D] = useState(true);

  return (
    <MatrixProvider>
      <div className="h-full w-full overflow-hidden">
        <div className="h-full w-full overflow-hidden flex">
          {/* Control Panel */}
          <div className="w-[22%]">
            <div className="h-full p-4 bg-white border border-gray-300 shadow-xl backdrop-blur-md">
              <MatrixInputWrapper />
              <button
                className="mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition w-full"
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

          {/* Graph View */}
          <div className="w-[78%] flex justify-center items-center overflow-hidden">
            {is3D ? <Graph2D mode="vector" /> : <Graph3D />}
          </div>
        </div>
      </div>
    </MatrixProvider>
  );
};

export default MatrixPlayground;
