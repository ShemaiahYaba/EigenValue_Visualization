import React, { useState } from "react";
import { motion } from "framer-motion";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
import Graph3D from "@/components/GraphingTools/Graph3D";
import Graph2D from "@/components/GraphingTools/Graph2D";
import { MatrixProvider } from "@/contexts/MatrixProvider";

const MatrixPlayground: React.FC = () => {
  const [is3D, setIs3D] = useState(true);

  return (
    <MatrixProvider>
      <div className="h-full w-full overflow-hidden ">
        {/* Main Playground Graph */}
        <div className="h-full w-full ">{is3D ? <Graph3D /> : <Graph2D />}</div>

        {/* Draggable Control Panel */}
        <motion.div
          drag
          dragConstraints={{
            left: 0,
            top: 0,
            right: window.innerWidth - 300,
            bottom: window.innerHeight - 200,
          }}
          className="absolute top-10 left-10 z-50 cursor-grab active:cursor-grabbing"
        >
          <div className="p-4 bg-white border border-gray-300 rounded-xl shadow-xl backdrop-blur-md ">
            <MatrixInput />
            <button
              className="mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition w-full"
              onClick={() => setIs3D(!is3D)}
            >
              Toggle to {is3D ? "2D" : "3D"}
            </button>
          </div>
        </motion.div>
      </div>
    </MatrixProvider>
  );
};

export default MatrixPlayground;
