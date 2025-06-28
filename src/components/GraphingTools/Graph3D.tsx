// components/Graph3D.tsx
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls";
import { TransformedVectors } from "@/components/GraphingTools/TransformedVectors";
import * as THREE from "three";

// Create a component to handle the auto-rotation
const AutoRotate: React.FC = () => {
  const { gl } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [isIdle, setIsIdle] = useState(true);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleActivity = () => {
      setIsIdle(false);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 3000);
    };

    const element = gl.domElement;

    element.addEventListener("pointerdown", handleActivity);
    element.addEventListener("pointermove", handleActivity);
    element.addEventListener("wheel", handleActivity);

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      element.removeEventListener("pointerdown", handleActivity);
      element.removeEventListener("pointermove", handleActivity);
      element.removeEventListener("wheel", handleActivity);
    };
  }, [gl]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isIdle;
    }
  }, [isIdle]);

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 0, 0]}
      minDistance={2}
      maxDistance={40}
      autoRotateSpeed={1}
    />
  );
};

// PCA-specific vectors component that doesn't depend on MatrixProvider
const PCAVectors: React.FC<{ vectors: number[][] }> = ({ vectors }) => {
  if (!vectors || !Array.isArray(vectors)) return null;

  return (
    <>
      {vectors.map((row, index) => {
        const [x, y, z = 0] = row;
        const dir = new THREE.Vector3(x, y, z).normalize();
        const origin = new THREE.Vector3(0, 0, 0);
        const length = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        // Define colors: ev1 = yellow, ev2 = red, ev3 = green, ev4 = purple
        const eigenArrowColors = [0xFFD600, 0xE11D48, 0x00C853, 0x8e24aa];
        const color = eigenArrowColors[index] || 0x888888;
        const arrowHelper = new THREE.ArrowHelper(dir, origin, length, color);
        return <primitive key={index} object={arrowHelper} />;
      })}
    </>
  );
};

interface Graph3DProps {
  vectors?: number[][];
  axisLabels?: string[];
  showLegend?: boolean;
  width?: number;
  height?: number;
}

const Graph3D: React.FC<Graph3DProps> = ({ 
  vectors, 
  axisLabels, 
  showLegend = true,
  width = 800,
  height = 600
}) => {
  return (
    <div
      className="flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <div style={{ width: "100%", height: "100%", position: 'relative' }}>
        {/* Legend for EV1 and EV2 */}
        {showLegend && (
        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 20 }} className="bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-xs flex flex-col gap-1 shadow-md">
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-2 rounded" style={{ background: '#FFD600' }} />
              <span>{axisLabels?.[0] || 'PC1'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-2 rounded" style={{ background: '#E11D48' }} />
              <span>{axisLabels?.[1] || 'PC2'}</span>
            </div>
            {axisLabels?.[2] && (
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-2 rounded" style={{ background: '#00C853' }} />
                <span>{axisLabels[2]}</span>
              </div>
            )}
          </div>
        )}
        <Canvas camera={{ position: [8, 8, 8], fov: 60 }}>
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />

          <gridHelper args={[50, 20, "blue", "gray"]} />
          <GizmoHelper alignment="top-right" margin={[160, 80]}>
            <GizmoViewport
              axisColors={["#ff0000", "#00ff00", "#0000ff"]}
              labelColor="white"
            />
          </GizmoHelper>

          {/* Render either PCA vectors or TransformedVectors based on props */}
          {vectors ? (
            <PCAVectors vectors={vectors} />
          ) : (
          <TransformedVectors />
          )}

          {/* User interaction with auto-rotation */}
          <AutoRotate />
        </Canvas>
      </div>
    </div>
  );
};

export default Graph3D;
