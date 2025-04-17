import React from "react";

const GridLines: React.FC<{
  width: number;
  height: number;
  unit: number;
  offset: { x: number; y: number };
  xRange: number[];
  yRange: number[];
}> = ({ width, height, unit, offset, xRange, yRange }) => {
  const xTicks = [];
  const yTicks = [];

  const centerX = width / 2 + offset.x;
  const centerY = height / 2 + offset.y;

  for (let x = xRange[0]; x <= xRange[1]; x += 1) {
    const xPos = centerX + x * unit;
    if (xPos >= 0 && xPos <= width) {
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
  }

  for (let y = yRange[0]; y <= yRange[1]; y += 1) {
    const yPos = centerY - y * unit;
    if (yPos >= 0 && yPos <= height) {
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
  }

  return (
    <>
      {xTicks}
      {yTicks}
    </>
  );
};

export default GridLines;
