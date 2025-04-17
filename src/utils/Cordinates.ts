export const screenToWorld = (
  screenX: number,
  screenY: number,
  unit: number,
  offset: { x: number; y: number },
  width: number,
  height: number
) => {
  const centerX = width / 2 + offset.x;
  const centerY = height / 2 + offset.y;
  return {
    x: (screenX - centerX) / unit,
    y: -(screenY - centerY) / unit,
  };
};

export const worldToScreen = (
  worldX: number,
  worldY: number,
  unit: number,
  offset: { x: number; y: number },
  width: number,
  height: number
) => {
  const centerX = width / 2 + offset.x;
  const centerY = height / 2 + offset.y;
  return {
    x: centerX + worldX * unit,
    y: centerY - worldY * unit,
  };
};
