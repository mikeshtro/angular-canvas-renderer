import { Path2DBuilder } from '@mikeshtro/svg';

import { Path } from './path';

/**
 * Renderers given path and its subpaths into a given context
 * @param path path to be rendered
 * @param pathBuilder path builder used to build child paths
 * @param context context in which the path is rendered
 */
export function renderPath(
  path: Path,
  pathBuilder: Path2DBuilder,
  context: CanvasRenderingContext2D
): void {
  const stroke = path.getStroke();
  const fill = path.getFill();
  const path2d = path.getPath2D(pathBuilder);
  if (fill != null) {
    context.fillStyle = fill;
    context.fill(path2d);
  }
  if (stroke != null) {
    context.strokeStyle = stroke;
    context.stroke(path2d);
  }
  for (const childPath of path.getPaths()) {
    renderPath(childPath, pathBuilder, context);
  }
}
