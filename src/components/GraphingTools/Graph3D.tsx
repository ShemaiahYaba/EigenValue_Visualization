// components/Graph3D.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { TransformedVectors } from "@/components/GraphingTools/TransformedVectors";

const Graph3D: React.FC = () => {
  return (
    <div className="w-full h-[500px] border rounded-lg overflow-hidden">
      <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        {/* Grid and coordinate helper */}
        <gridHelper args={[10, 10, `white`, `gray`]} />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#ff0000", "#00ff00", "#0000ff"]}
            labelColor="white"
          />
        </GizmoHelper>

        {/* Transformed vectors */}
        <TransformedVectors />

        {/* User interaction */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Graph3D;
