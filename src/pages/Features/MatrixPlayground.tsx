import React from "react";
import MatrixInput from "@/components/MatrixInput";
import GraphingTool from "@/components/GraphingTool";
import { MatrixProvider } from "@/contexts/MatrixProvider";

const MatrixPlayground: React.FC = () => {
  return (
    <>
      <MatrixProvider>
        <div className="flex justify-center items-center h-screen">
          <div className="flex gap-5">
            <div className="p-5 border border-gray-300 rounded-xl bg-white shadow-md">
              <MatrixInput />
            </div>
            <div className="p-5 border border-gray-300 rounded-xl bg-white shadow-md">
              <GraphingTool />
            </div>
          </div>
        </div>
      </MatrixProvider>
    </>
  );
};
export default MatrixPlayground;
