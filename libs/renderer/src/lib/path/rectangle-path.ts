import {
  CommonAttributes,
  isRectangleAttribute,
  Path2DBuilder,
  RectangleAttributes,
  rectangleToPath,
} from '@mikeshtro/svg';

import { coerceNumber } from '../coercion';
import { Rectangle } from '../rectangle';
import { Size } from '../size';
import { Path } from './path';

export class RectanglePath extends Path<
  CommonAttributes & RectangleAttributes
> {
  override getPath2D(pathBuilder: Path2DBuilder): Path2D {
    const attributes: RectangleAttributes = {
      x: this.attributes['x'],
      y: this.attributes['y'],
      width: this.attributes['width'],
      height: this.attributes['height'],
    };
    return rectangleToPath(attributes, pathBuilder);
  }

  override getPathRectangle(): Rectangle | undefined {
    const x = this.attributes['x'] ?? 0;
    const y = this.attributes['y'] ?? 0;
    const width = this.attributes['width'];
    const height = this.attributes['height'];
    if (width == null || height == null) {
      return undefined;
    }

    return { x, y, width, height };
  }

  override getSize(): Size {
    const width = this.attributes['width'] ?? 0;
    const height = this.attributes['height'] ?? 0;
    return { width, height };
  }

  override setAttribute(name: string, value: string): void {
    if (isRectangleAttribute(name)) {
      this.attributes[name] = coerceNumber(value, 0);
    } else {
      super.setAttribute(name, value);
    }
  }
}
