export type RectangleAttributes = Partial<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export function isRectangleAttribute(
  key: string
): key is keyof RectangleAttributes {
  return key === 'x' || key == 'y' || key === 'width' || key == 'height';
}
