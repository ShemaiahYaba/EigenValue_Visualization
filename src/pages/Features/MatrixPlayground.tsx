import React from "react";
import MatrixInput from "@/components/GraphingTools/MatrixInput";
// import GraphPaper from "@/components/GraphingTools/GraphPaper";
import Graph3D from "@/components/GraphingTools/Graph3D";
import { MatrixProvider } from "@/contexts/MatrixProvider";

const MatrixPlayground: React.FC = () => {
  return (
    <>
      <MatrixProvider>
        <div className="flex justify-center items-center h-screen gap-5">
          <div className="p-5 border border-gray-300 rounded-xl bg-white shadow-md">
            <MatrixInput />
          </div>
          <div className="p-5 border border-gray-300 rounded-xl bg-white shadow-md">
            <Graph3D />
          </div>
        </div>
      </MatrixProvider>
    </>
  );
};
export default MatrixPlayground;
