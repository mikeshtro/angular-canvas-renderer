import { coerceNumber } from './coercion';
import { RectangleAttributes } from './rectangle-attributes';

export function rectangleToPath(attr: RectangleAttributes): Path2D {
  const x = coerceNumber(attr.x, 0);
  const y = coerceNumber(attr.y, 0);
  const width = coerceNumber(attr.width, 0);
  const height = coerceNumber(attr.height, 0);

  return new Path2D(`m ${x} ${y} h ${width} v${height} h ${-width} Z`);
}
