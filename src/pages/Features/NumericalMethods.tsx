import React from "react";
import { MatrixProvider } from "@/contexts/MatrixProvider";
import NumericalMethodsInner from "@/components/GraphingTools/NumericalMethodsInner"; // or wherever it's defined

const NumericalMethods: React.FC = () => {
  return (
    <MatrixProvider>
      <NumericalMethodsInner />
    </MatrixProvider>
  );
};

export default NumericalMethods;
