"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
import Graph3D from "@/components/GraphingTools/Graph3D";
import GraphPaper from "@/components/GraphingTools/GraphPaper";
import { MatrixProvider } from "@/contexts/MatrixProvider";

const MatrixPlayground: React.FC = () => {
  const [is3D, setIs3D] = useState(true);

  return (
    <MatrixProvider>
      <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Background Graph */}
        <div className="absolute inset-0 z-0">
          {is3D ? <Graph3D /> : <GraphPaper />}
        </div>

        {/* Draggable Panel */}
        <motion.div
          drag
          dragConstraints={{
            left: 0,
            top: 0,
            right: window.innerWidth - 200,
            bottom: window.innerHeight - 100,
          }}
          className="absolute top-10 left-10 z-50 cursor-grab active:cursor-grabbing"
        >
          <div className="p-4 bg-white border border-gray-300 rounded-xl shadow-xl backdrop-blur-md w-[300px]">
            <h2 className="font-semibold text-lg mb-2">Matrix Controls</h2>
            <MatrixInput />
            <button
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition w-full"
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
