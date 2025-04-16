import React from "react";

const GraphBook: React.FC = () => {
  const width = 500;
  const height = 400;
  const padding = 50;

  return (
    <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
      {/* X and Y Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="black"
      />
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="black"
      />

      {/* X Axis Label */}
      <text
        x={width / 2}
        y={height - padding / 2}
        textAnchor="middle"
        fontSize="14"
      >
        X Axis
      </text>

      {/* Y Axis Label */}
      <text
        x={-height / 2}
        y={padding / 3}
        transform="rotate(-90)"
        textAnchor="middle"
        fontSize="14"
      >
        Y Axis
      </text>

      {/* Example data points */}
      <circle cx={padding + 40} cy={height - padding - 30} r="5" fill="blue" />
      <circle cx={padding + 100} cy={height - padding - 80} r="5" fill="blue" />
      <circle
        cx={padding + 160}
        cy={height - padding - 120}
        r="5"
        fill="blue"
      />

      {/* Lines connecting points */}
      <polyline
        fill="none"
        stroke="blue"
        strokeWidth="2"
        points={`${padding + 40},${height - padding - 30} 
                 ${padding + 100},${height - padding - 80} 
                 ${padding + 160},${height - padding - 120}`}
      />
    </svg>
  );
};

export default GraphBook;
