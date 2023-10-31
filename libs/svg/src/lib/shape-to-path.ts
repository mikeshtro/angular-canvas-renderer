import { RectangleAttributes } from './attributes';
import { Path2DBuilder } from './path-builder';

export function rectangleToPath(
  attr: RectangleAttributes,
  path2dBuilder: Path2DBuilder
): Path2D {
  const x = attr.x ?? 0;
  const y = attr.y ?? 0;
  const width = attr.width ?? 0;
  const height = attr.height ?? 0;

  return path2dBuilder.m(x, y).h(width).v(height).h(-width).z().build();
}
