import React, { useRef, useState } from "react";

const GraphPaper: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 800, height = 600 }) => {
  const [unit, setUnit] = useState(40); // pixels per unit
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // panning offset in pixels
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef(offset);

  const xRange = [-width / 2, width / 2];
  const yRange = [-height / 2, height / 2];

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomIntensity = 1.1;
    const newUnit = e.deltaY < 0 ? unit * zoomIntensity : unit / zoomIntensity;
    setUnit(Math.max(10, Math.min(200, newUnit)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = offset;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setOffset({
        x: offsetStart.current.x + dx,
        y: offsetStart.current.y + dy,
      });
    }
  };

  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => setDragging(false);

  const handleReset = () => {
    setUnit(40); // Reset zoom level
    setOffset({ x: 0, y: 0 }); // Reset panning
  };

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

  const arrowSize = 6;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg
        width={width}
        height={height}
        style={{ background: "#fff", cursor: dragging ? "grabbing" : "grab" }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
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
      <button
        onClick={handleReset}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "5px",
          cursor: "pointer",
        }}
        title="Reset View"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>
    </div>
  );
};

export default GraphPaper;
