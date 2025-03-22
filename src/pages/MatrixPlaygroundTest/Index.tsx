import { useState } from "react";
import MatrixInput from "@/pages/MatrixPlaygroundTest/MatrixInput";
import EigenVectorVisualization from "@/components/MatrixPlaygroundTests/Visualization";

interface EigenData {
  eigenvalues: number[];
  eigenvectors: number[][];
}

function Index() {
  const [eigenData, setEigenData] = useState<EigenData | null>(null);

  return (
    <div>
      <h1>Eigenvalue & Eigenvector Visualization</h1>
      <MatrixInput setEigenData={setEigenData} />
      {eigenData && (
        <div>
          <h3>Eigenvalues:</h3>
          <p>{eigenData.eigenvalues.join(", ")}</p>
          <h3>Eigenvectors:</h3>
          <EigenVectorVisualization eigenvectors={eigenData.eigenvectors} />
        </div>
      )}
    </div>
  );
}

export default Index;
