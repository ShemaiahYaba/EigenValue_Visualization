import React from "react";

const AxisArrows: React.FC<{
  width: number;
  height: number;
  offset: { x: number; y: number };
}> = ({ width, height, offset }) => {
  const centerX = width / 2 + offset.x;
  const centerY = height / 2 + offset.y;
  const arrowSize = 6;

  return (
    <>
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
    </>
  );
};

export default AxisArrows;
