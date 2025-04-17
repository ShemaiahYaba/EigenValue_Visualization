import React from "react";

interface Props {
  mouse: { x: number; y: number };
  unit: number;
  offset: { x: number; y: number };
  width: number;
  height: number;
}

const CoordinateHUD: React.FC<Props> = ({
  mouse,
  unit,
  offset,
  width,
  height,
}) => {
  const centerX = width / 2 + offset.x;
  const centerY = height / 2 + offset.y;
  const x = ((mouse.x - centerX) / unit).toFixed(2);
  const y = (-(mouse.y - centerY) / unit).toFixed(2);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "4px 8px",
        fontSize: "12px",
      }}
    >
      ({x}, {y})
    </div>
  );
};

export default CoordinateHUD;
