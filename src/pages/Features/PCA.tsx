import React from "react";
import { MatrixProvider } from "@/contexts/MatrixProvider";
import PCAInner from "@/components/PCA/PCAMain"; // or wherever it's defined

const PCAModule: React.FC = () => {
  return (
    <MatrixProvider>
      <PCAInner />
    </MatrixProvider>
  );
};

export default PCAModule;
