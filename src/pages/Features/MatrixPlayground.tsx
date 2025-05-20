import React, { useState } from "react";
import Draggable from "react-draggable";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
import Graph3D from "@/components/GraphingTools/Graph3D";
import GraphPaper from "@/components/GraphingTools/GraphPaper";
import { MatrixProvider } from "@/contexts/MatrixProvider";

const MatrixPlayground: React.FC = () => {
  const [is3D, setIs3D] = useState(true);

  return (
    <MatrixProvider>
      <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Graph Background */}
        <div className="absolute inset-0 z-0">
          {is3D ? <Graph3D /> : <GraphPaper />}
        </div>

        {/* Draggable Matrix Input Panel */}
        <Draggable handle=".drag-handle">
          <div className="absolute top-10 left-10 z-50 cursor-move">
            <div className="drag-handle p-4 bg-white border border-gray-300 rounded-xl shadow-xl backdrop-blur-sm">
              <h2 className="font-semibold text-lg mb-2">Matrix Controls</h2>
              <MatrixInput />
              <button
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                onClick={() => setIs3D(!is3D)}
              >
                Toggle to {is3D ? "2D" : "3D"}
              </button>
            </div>
          </div>
        </Draggable>
      </div>
    </MatrixProvider>
  );
};

export default MatrixPlayground;
