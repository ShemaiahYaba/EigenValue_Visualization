import React from "react";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
import Graph2D from "@/components/GraphingTools/Graph2D";
import { MatrixProvider } from "@/contexts/MatrixProvider";

const NumericalMethods: React.FC = () => {
  return (
    <MatrixProvider>
      <div className="h-full w-full overflow-hidden ">
        {/* Draggable Control Panel */}

        <div className="h-full w-full overflow-hidden flex">
          {/* Control Panel - 30% width */}
          <div className="w-[22%]">
            <div className="h-full p-4 bg-white border border-gray-300  shadow-xl backdrop-blur-md">
              <MatrixInput />
            </div>
          </div>

          {/* Main Playground Graph - 70% width */}
          <div className="w-[78%] flex justify-center items-center overflow-hidden">
            <Graph2D />
          </div>
        </div>
      </div>
    </MatrixProvider>
  );
};

export default NumericalMethods;
