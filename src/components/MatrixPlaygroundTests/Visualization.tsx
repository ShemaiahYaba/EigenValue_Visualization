import { Canvas } from "@react-three/fiber";
import { Vector3, ArrowHelper } from "three";

const EigenVectorVisualization = ({
  eigenvectors,
}: {
  eigenvectors: number[][];
}) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {eigenvectors.map((vec, index) => {
        const dir = new Vector3(vec[0], vec[1], vec.length > 2 ? vec[2] : 0)
          .clone()
          .normalize();

        return (
          <primitive
            key={index}
            object={new ArrowHelper(dir, new Vector3(0, 0, 0), 2, 0xff0000)}
          />
        );
      })}
    </Canvas>
  );
};

export default EigenVectorVisualization;
