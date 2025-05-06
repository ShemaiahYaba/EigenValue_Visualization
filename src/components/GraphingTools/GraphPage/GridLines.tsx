import React from "react";

function getStepSizes(unit: number) {
  const pixelsPerMajor = 80; // target pixels between major lines
  const rawStep = pixelsPerMajor / unit;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const fraction = rawStep / magnitude;

  let niceFraction = 1;
  if (fraction < 1.5) niceFraction = 1;
  else if (fraction < 3) niceFraction = 2;
  else if (fraction < 7.5) niceFraction = 5;
  else niceFraction = 10;

  const major = niceFraction * magnitude;
  const minor = major / 5;

  return { major, minor };
}

function formatLabel(value: number) {
  if (Math.abs(value) < 1e-4 || Math.abs(value) >= 1e5) {
    return value.toExponential(2);
  }
  return parseFloat(value.toFixed(6)).toString();
}

const isAxisLine = (val: number, step: number) => Math.abs(val) < step / 10;

const GridLines: React.FC<{
  width: number;
  height: number;
  unit: number;
  offset: { x: number; y: number };
}> = ({ width, height, unit, offset }) => {
  const centerX = width / 2 + offset.x;
  const centerY = height / 2 + offset.y;
  const { major, minor } = getStepSizes(unit);
  const lines: React.ReactNode[] = [];

  const drawGridLines = (
    from: number,
    to: number,
    isVertical: boolean // true = vertical lines (X), false = horizontal lines (Y)
  ) => {
    const center = isVertical ? centerX : centerY;

    for (const step of [minor, major]) {
      const isMajor = step === major;
      const start = Math.ceil(from / step) * step;

      for (let val = start; val <= to; val += step) {
        const pos = center + (isVertical ? val : -val) * unit;
        const key = `${isVertical ? "v" : "h"}-${val.toFixed(6)}-${step}`;

        const stroke = isAxisLine(val, major)
          ? "#000"
          : isMajor
          ? "#ccc"
          : "#eee";
        const strokeWidth = isAxisLine(val, major) ? 1.5 : isMajor ? 1 : 0.5;

        lines.push(
          <line
            key={key}
            x1={isVertical ? pos : 0}
            y1={isVertical ? 0 : pos}
            x2={isVertical ? pos : width}
            y2={isVertical ? height : pos}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );

        if (isMajor && !isAxisLine(val, major)) {
          lines.push(
            <text
              key={`label-${key}`}
              x={isVertical ? pos : centerX + 5}
              y={isVertical ? centerY + 12 : pos - 4}
              fontSize={11}
              textAnchor={isVertical ? "middle" : "start"}
              fill="#444"
            >
              {formatLabel(val)}
            </text>
          );
        }
      }
    }
  };

  // Vertical grid (X axis)
  drawGridLines((0 - centerX) / unit, (width - centerX) / unit, true);

  // Horizontal grid (Y axis)
  drawGridLines((centerY - height) / unit, centerY / unit, false);

  return (
    <>
      {/* Optional background tint to resemble graph paper */}
      <rect x={0} y={0} width={width} height={height} fill="#fefefe" />
      {lines}
    </>
  );
};

export default GridLines;
