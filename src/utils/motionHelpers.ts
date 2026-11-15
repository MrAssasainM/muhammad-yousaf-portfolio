export interface TiltAngles {
  rotateX: number;
  rotateY: number;
}

export function clampUnit(value: number): number {
  if (!Number.isFinite(value)) return 0.5;
  return Math.min(1, Math.max(0, value));
}

export function calculateTiltAngles(
  normalizedX: number,
  normalizedY: number,
  maxTiltDeg = 6
): TiltAngles {
  const x = clampUnit(normalizedX);
  const y = clampUnit(normalizedY);

  // Moving pointer right (+X) tilts right edge away (+rotateY),
  // moving pointer down (+Y) tilts bottom edge away (-rotateX).
  const rotateY = Number(((x - 0.5) * 2 * maxTiltDeg).toFixed(2));
  const rotateX = Number(((0.5 - y) * 2 * maxTiltDeg).toFixed(2));

  return {
    rotateX: Object.is(rotateX, -0) ? 0 : rotateX,
    rotateY: Object.is(rotateY, -0) ? 0 : rotateY,
  };
}
