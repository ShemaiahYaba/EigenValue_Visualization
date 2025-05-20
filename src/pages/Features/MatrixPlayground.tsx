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
      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Fullscreen Background Graph */}
        <div className="fixed inset-0 z-0 w-full h-full">
          {is3D ? <Graph3D /> : <GraphPaper />}
        </div>

        {/* Draggable Floating Panel */}
        <motion.div
          drag
          dragConstraints={{
            left: 0,
            top: 0,
            right: window.innerWidth - 320,
            bottom: window.innerHeight - 200,
          }}
          className="absolute top-10 left-10 z-50 cursor-grab active:cursor-grabbing"
        >
          <div className="p-4 w-[320px] bg-white border border-gray-300 rounded-xl shadow-xl backdrop-blur-md">
            <h2 className="font-semibold text-lg mb-2">Matrix Controls</h2>
            <MatrixInput />
            <button
              className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
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
