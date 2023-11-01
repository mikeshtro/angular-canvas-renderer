export type CommonAttributes = Partial<{
  stroke: string;
  fill: string;
}>;

export function isCommonAttribute(key: string): key is keyof CommonAttributes {
  return key === 'stroke' || key === 'fill';
}
