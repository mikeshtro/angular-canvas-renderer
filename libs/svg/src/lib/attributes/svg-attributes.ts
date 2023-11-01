export type SvgPathAttributes = Partial<{
  width: number;
  height: number;
}>;

export function isSvgAttribute(key: string): key is keyof SvgPathAttributes {
  return key === 'width' || key == 'height';
}
