import React from "react";

const GraphPaper: React.FC<{
  width?: number;
  height?: number;
  xRange?: number[];
  yRange?: number[];
  unit?: number;
}> = ({
  width = 800,
  height = 600,
  xRange = [-16, 16],
  yRange = [-8, 8],
  unit = 20,
}) => {
  const xTicks = [];
  const yTicks = [];

  const xStart = xRange[0];
  const xEnd = xRange[1];
  const yStart = yRange[0];
  const yEnd = yRange[1];

  const centerX = (0 - xStart) * unit;
  const centerY = (yEnd - 0) * unit;

  // Vertical lines
  for (let x = xStart; x <= xEnd; x++) {
    const xPos = (x - xStart) * unit;
    xTicks.push(
      <line
        key={`v-${x}`}
        x1={xPos}
        y1={0}
        x2={xPos}
        y2={height}
        stroke="#ccc"
        strokeWidth={x === 0 ? 2 : 1}
      />
    );
    if (x !== 0) {
      xTicks.push(
        <text
          key={`xt-${x}`}
          x={xPos + 2}
          y={centerY - 5}
          fontSize="10"
          fill="#555"
        >
          {x}
        </text>
      );
    }
  }

  // Horizontal lines
  for (let y = yStart; y <= yEnd; y++) {
    const yPos = (yEnd - y) * unit;
    yTicks.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={yPos}
        x2={width}
        y2={yPos}
        stroke="#ccc"
        strokeWidth={y === 0 ? 2 : 1}
      />
    );
    if (y !== 0) {
      yTicks.push(
        <text
          key={`yt-${y}`}
          x={centerX + 5}
          y={yPos - 2}
          fontSize="10"
          fill="#555"
        >
          {y}
        </text>
      );
    }
  }

  return (
    <svg width={width} height={height} style={{ background: "#fff" }}>
      {/* Grid lines */}
      {xTicks}
      {yTicks}
    </svg>
  );
};

export default GraphPaper;
