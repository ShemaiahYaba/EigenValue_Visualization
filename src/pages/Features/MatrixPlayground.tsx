import React from "react";
import MatrixInput from "@/components/MatrixInput";

const MatrixPlayground: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <div className="p-5 border border-gray-300 rounded-xl bg-white shadow-md ">
          <MatrixInput />
        </div>
      </div>
    </>
  );
};
export default MatrixPlayground;
