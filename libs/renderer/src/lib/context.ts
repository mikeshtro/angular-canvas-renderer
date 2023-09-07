import { Path } from './path';

export function renderPath(
  path: Path,
  context: CanvasRenderingContext2D
): void {
  const stroke = path.getStroke();
  const fill = path.getFill();
  const path2d = path.getPath2D();
  if (fill != null) {
    context.fillStyle = fill;
    context.fill(path2d);
  }
  if (stroke != null) {
    context.strokeStyle = stroke;
    context.stroke(path2d);
  }
  for (const childPath of path.getPaths()) {
    renderPath(childPath, context);
  }
}
