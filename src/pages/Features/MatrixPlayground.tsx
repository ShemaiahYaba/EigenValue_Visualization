import React, { useState } from "react";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
import Graph3D from "@/components/GraphingTools/Graph3D";
import Graph2D from "@/components/GraphingTools/Graph2D";
import { MatrixProvider } from "@/contexts/MatrixProvider";

const MatrixPlayground: React.FC = () => {
  const [is3D, setIs3D] = useState(true);

  return (
    <MatrixProvider>
      <div className="h-full w-full overflow-hidden ">
        {/* Draggable Control Panel */}

        <div className="h-full w-full overflow-hidden flex">
          {/* Control Panel - 30% width */}
          <div className="w-[22%]">
            <div className="h-full p-4 bg-white border border-gray-300  shadow-xl backdrop-blur-md">
              <MatrixInput />
              <button
                className="mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition w-full"
                onClick={() => setIs3D(!is3D)}
              >
                Toggle to {is3D ? "3D" : "2D"}
              </button>
            </div>
          </div>

          {/* Main Playground Graph - 70% width */}
          <div className="w-[78%] flex justify-center items-center overflow-hidden">
            {is3D ? <Graph2D /> : <Graph3D />}
          </div>
        </div>
      </div>
    </MatrixProvider>
  );
};

export default MatrixPlayground;
