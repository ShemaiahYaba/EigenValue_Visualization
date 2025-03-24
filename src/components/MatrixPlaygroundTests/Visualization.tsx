import { Canvas } from "@react-three/fiber";
import { Vector3, ArrowHelper } from "three";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";

const EigenVectorVisualization = ({
  eigenvectors,
}: {
  eigenvectors: number[][];
}) => {
  const arrows = useMemo(
    () =>
      eigenvectors.map((vec) => {
        const direction = new Vector3(
          vec[0],
          vec[1],
          vec.length > 2 ? vec[2] : 0
        )
          .clone()
          .normalize();
        return new ArrowHelper(direction, new Vector3(0, 0, 0), 2, 0xff0000);
      }),
    [eigenvectors]
  );

  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />

      {/* Axes Helper */}
      <gridHelper args={[10, 10]} />
      <axesHelper args={[5]} />

      {/* Eigenvectors */}
      {arrows.map((arrow, index) => (
        <primitive key={index} object={arrow} />
      ))}

      {/* Camera Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default EigenVectorVisualization;
