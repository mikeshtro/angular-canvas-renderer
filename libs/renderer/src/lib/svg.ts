import { Path2DBuilder } from '@mikeshtro/svg';

import { coerceNumber } from './coercion';
import { RectangleAttributes } from './rectangle-attributes';

export function rectangleToPath(
  attr: RectangleAttributes,
  path2dBuilder: Path2DBuilder
): Path2D {
  const x = coerceNumber(attr.x, 0);
  const y = coerceNumber(attr.y, 0);
  const width = coerceNumber(attr.width, 0);
  const height = coerceNumber(attr.height, 0);

  return path2dBuilder.m(x, y).h(width).v(height).h(-width).z().build();
}
