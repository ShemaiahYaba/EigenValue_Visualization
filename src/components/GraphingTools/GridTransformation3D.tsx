import React, {  } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function linspace(start: number, end: number, num: number): number[] {
  const step = (end - start) / (num - 1);
  return Array.from({ length: num }, (_, i) => start + i * step);
}

interface GridTransformation3DProps {
  matrix: number[][]; // 3x3 matrix
  gridMin?: number;
  gridMax?: number;
  gridSteps?: number;
  width?: number;
  height?: number;
}

const AxisLines: React.FC<{ gridMin: number; gridMax: number }> = ({ gridMin, gridMax }) => {
  // X axis (red), Y axis (green), Z axis (blue)
  return (
    <group>
      {/* X axis */}
      <primitive
        object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(gridMin, 0, 0),
            new THREE.Vector3(gridMax, 0, 0),
          ]),
          new THREE.LineBasicMaterial({ color: 0xff0000 })
        )}
      />
      {/* Y axis */}
      <primitive
        object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, gridMin, 0),
            new THREE.Vector3(0, gridMax, 0),
          ]),
          new THREE.LineBasicMaterial({ color: 0x00ff00 })
        )}
      />
      {/* Z axis */}
      <primitive
        object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, gridMin),
            new THREE.Vector3(0, 0, gridMax),
          ]),
          new THREE.LineBasicMaterial({ color: 0x0000ff })
        )}
      />
    </group>
  );
};

const GridTransformation3D: React.FC<GridTransformation3DProps> = ({
  matrix,
  gridMin = -2,
  gridMax = 2,
  gridSteps = 6,
  width = 600,
  height = 400,
}) => {
  const x = linspace(gridMin, gridMax, gridSteps);
  const y = linspace(gridMin, gridMax, gridSteps);
  const z = linspace(gridMin, gridMax, gridSteps);
  const grid: [number, number, number][] = [];
  x.forEach((xi) => y.forEach((yi) => z.forEach((zi) => grid.push([xi, yi, zi]))));

  const transformedGrid = grid.map(([xi, yi, zi]) => [
    matrix[0][0] * xi + matrix[0][1] * yi + matrix[0][2] * zi,
    matrix[1][0] * xi + matrix[1][1] * yi + matrix[1][2] * zi,
    matrix[2][0] * xi + matrix[2][1] * yi + matrix[2][2] * zi,
  ]);

  return (
    <div style={{ width, height }}>
      <Canvas camera={{ position: [8, 8, 8], fov: 60 }} style={{ width, height }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        {/* Axes */}
        <AxisLines gridMin={gridMin} gridMax={gridMax} />
        {/* Original grid points (gray) */}
        {grid.map(([x, y, z], i) => (
          <mesh key={"orig-"+i} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#bbb" />
          </mesh>
        ))}
        {/* Transformed grid points (orange) and arrows */}
        {grid.map(([x, y, z], i) => {
          const [x1, y1, z1] = transformedGrid[i];
          const dir = new THREE.Vector3(x1 - x, y1 - y, z1 - z).normalize();
          const length = new THREE.Vector3(x1 - x, y1 - y, z1 - z).length();
          return (
            <group key={"arrow-"+i}>
              {/* Arrow from original to transformed */}
              <arrowHelper args={[dir, new THREE.Vector3(x, y, z), length, 0xe11d48]} />
              {/* Transformed grid point */}
              <mesh position={[x1, y1, z1]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#f59e42" />
              </mesh>
            </group>
          );
        })}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default GridTransformation3D; 