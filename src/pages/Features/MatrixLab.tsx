import React from "react";
import MatrixInput from "@/components/MatrixInput";

const MatrixLab: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-5 border border-gray-300 rounded-lg bg-white shadow-md">
          <MatrixInput />
        </div>
      </div>
    </>
  );
};
export default MatrixLab;
