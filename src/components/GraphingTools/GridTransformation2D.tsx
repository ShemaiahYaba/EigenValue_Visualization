import React from "react";

// Utility to generate linearly spaced numbers
function linspace(start: number, end: number, num: number): number[] {
  const step = (end - start) / (num - 1);
  return Array.from({ length: num }, (_, i) => start + i * step);
}

interface GridTransformation2DProps {
  matrix: number[][]; // 2x2 matrix
  gridMin?: number;
  gridMax?: number;
  gridSteps?: number;
  width?: number;
  height?: number;
}

const GridTransformation2D: React.FC<GridTransformation2DProps> = ({
  matrix,
  gridMin = -2,
  gridMax = 2,
  gridSteps = 10,
  width = 400,
  height = 400,
}) => {
  // Generate grid points
  const x = linspace(gridMin, gridMax, gridSteps);
  const y = linspace(gridMin, gridMax, gridSteps);
  const grid: [number, number][] = [];
  x.forEach((xi) => y.forEach((yi) => grid.push([xi, yi])));

  // Transform grid points
  const transformedGrid = grid.map(([xi, yi]) => [
    matrix[0][0] * xi + matrix[0][1] * yi,
    matrix[1][0] * xi + matrix[1][1] * yi,
  ]);

  // Coordinate transforms (math to SVG)
  const toScreenX = (x: number) => ((x - gridMin) / (gridMax - gridMin)) * width;
  const toScreenY = (y: number) => height - ((y - gridMin) / (gridMax - gridMin)) * height;

  return (
    <svg width={width} height={height} style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8 }}>
      {/* Axes */}
      <line x1={toScreenX(gridMin)} y1={toScreenY(0)} x2={toScreenX(gridMax)} y2={toScreenY(0)} stroke="#222" strokeWidth={1.5} />
      <line x1={toScreenX(0)} y1={toScreenY(gridMin)} x2={toScreenX(0)} y2={toScreenY(gridMax)} stroke="#222" strokeWidth={1.5} />
      {/* Axis labels */}
      <text x={toScreenX(gridMax) - 20} y={toScreenY(0) - 8} fontSize="14" fill="#222">x</text>
      <text x={toScreenX(0) + 8} y={toScreenY(gridMax) + 16} fontSize="14" fill="#222">y</text>
      {/* Highlight origin */}
      <circle cx={toScreenX(0)} cy={toScreenY(0)} r={4} fill="#1976d2" stroke="#fff" strokeWidth={1.5} />
      {/* Draw original grid points */}
      {grid.map(([x0, y0], i) => (
        <circle key={"orig-"+i} cx={toScreenX(x0)} cy={toScreenY(y0)} r={2} fill="#bbb" />
      ))}
      {/* Draw arrows for each grid point */}
      {grid.map(([x0, y0], i) => {
        const [x1, y1] = transformedGrid[i];
        return (
          <g key={i}>
            <line
              x1={toScreenX(x0)}
              y1={toScreenY(y0)}
              x2={toScreenX(x1)}
              y2={toScreenY(y1)}
              stroke="#e11d48"
              strokeWidth={1.5}
              markerEnd="url(#arrowhead)"
              opacity={0.7}
            />
            {/* Transformed grid point */}
            <circle cx={toScreenX(x1)} cy={toScreenY(y1)} r={2} fill="#f59e42" />
          </g>
        );
      })}
      {/* Arrowhead marker definition */}
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
          <polygon points="0,0 8,4 0,8" fill="#e11d48" />
        </marker>
      </defs>
    </svg>
  );
};

export default GridTransformation2D; 