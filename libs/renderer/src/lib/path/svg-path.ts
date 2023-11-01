import {
  CommonAttributes,
  isSvgAttribute,
  SvgPathAttributes,
} from '@mikeshtro/svg';

import { coerceNumber } from '../coercion';
import { Rectangle } from '../rectangle';
import { Size } from '../size';
import { Path } from './path';

export class SvgPath extends Path<CommonAttributes & SvgPathAttributes> {
  override getPath2D(): Path2D {
    return new Path2D();
  }

  override getPathRectangle(): Rectangle | undefined {
    const width = this.attributes['width'];
    const height = this.attributes['height'];
    if (width == null || height == null) {
      return undefined;
    }

    return { x: 0, y: 0, width, height };
  }

  override getSize(): Size {
    const width = this.attributes['width'] ?? 0;
    const height = this.attributes['height'] ?? 0;
    return { width, height };
  }

  override setAttribute(name: string, value: string): void {
    if (isSvgAttribute(name)) {
      this.attributes[name] = coerceNumber(value, 0);
    } else {
      super.setAttribute(name, value);
    }
  }
}
