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
  xRange = [-10, 10],
  yRange = [-6, 6],
  unit = 40, // tighter grid spacing like GeoGebra
}) => {
  const xTicks = [];
  const yTicks = [];

  const xStart = xRange[0];
  const xEnd = xRange[1];
  const yStart = yRange[0];
  const yEnd = yRange[1];

  const centerX = (0 - xStart) * unit;
  const centerY = (yEnd - 0) * unit;

  // Vertical grid lines
  for (let x = xStart; x <= xEnd; x++) {
    const xPos = (x - xStart) * unit;
    xTicks.push(
      <line
        key={`v-${x}`}
        x1={xPos}
        y1={0}
        x2={xPos}
        y2={height}
        stroke={x === 0 ? "#333" : "#ddd"}
        strokeWidth={x === 0 ? 1.5 : 1}
      />
    );
    if (x !== 0) {
      xTicks.push(
        <text
          key={`xt-${x}`}
          x={xPos}
          y={centerY + 12}
          fontSize="11"
          textAnchor="middle"
          fill="#555"
        >
          {x}
        </text>
      );
    }
  }

  // Horizontal grid lines
  for (let y = yStart; y <= yEnd; y++) {
    const yPos = (yEnd - y) * unit;
    yTicks.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={yPos}
        x2={width}
        y2={yPos}
        stroke={y === 0 ? "#333" : "#ddd"}
        strokeWidth={y === 0 ? 1.5 : 1}
      />
    );
    if (y !== 0) {
      yTicks.push(
        <text
          key={`yt-${y}`}
          x={centerX + 5}
          y={yPos + 4}
          fontSize="11"
          textAnchor="start"
          fill="#555"
        >
          {y}
        </text>
      );
    }
  }

  // Axis arrows
  const arrowSize = 6;

  return (
    <svg width={width} height={height} style={{ background: "#fff" }}>
      {/* Grid lines */}
      {xTicks}
      {yTicks}

      {/* X-axis arrow */}
      <polygon
        points={`${width},${centerY} ${width - arrowSize},${
          centerY - arrowSize
        } ${width - arrowSize},${centerY + arrowSize}`}
        fill="#333"
      />

      {/* Y-axis arrow */}
      <polygon
        points={`${centerX},0 ${centerX - arrowSize},${arrowSize} ${
          centerX + arrowSize
        },${arrowSize}`}
        fill="#333"
      />
    </svg>
  );
};

export default GraphPaper;
