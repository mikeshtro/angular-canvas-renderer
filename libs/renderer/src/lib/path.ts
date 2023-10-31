import {
  Path2DBuilder,
  RectangleAttributes,
  rectangleToPath,
} from '@mikeshtro/svg';

import { coerceNumber } from './coercion';
import { Rectangle } from './rectangle';
import { Size } from './size';

export function createPath(name: string, delegate: Element): Path {
  if (name === 'svg') {
    return new SvgPath(delegate);
  }

  if (name === 'rect') {
    return new RectanglePath(delegate);
  }

  throw Error(`Element ${name} is not supported yet`);
}

/**
 * Path object represents path to be rendered it can contain
 * child paths
 */
export abstract class Path {
  private readonly delegate: Element;
  private readonly attributes = new Map<string, string>();
  private readonly paths: Path[] = [];

  constructor(delegate: Element) {
    this.delegate = delegate;
  }

  /**
   * Returns stroke definition if defined by attribute
   */
  getStroke(): string | undefined {
    return this.attributes.get('stroke');
  }

  /**
   * Returns fill definition if defined by attribute
   */
  getFill(): string | undefined {
    return this.attributes.get('fill');
  }

  /**
   * Sets attribute vale
   * @param name name of attribute to be set
   * @param value attribute value
   */
  setAttribute(name: string, value: string): void {
    this.attributes.set(name, value);
  }

  /**
   * Adds given path as a child path
   * @param path child path
   */
  addPath(path: Path): void {
    this.paths.push(path);
  }

  /**
   * Returns list of all child paths
   */
  getPaths(): Path[] {
    return this.paths;
  }

  /**
   * Builds `Path2D` object to be rendered from its name
   * and given attributes. This path does not include stroke
   * and fill so it can be defined for each child separately
   * @param pathBuilder builder used to build the path
   */
  abstract getPath2D(pathBuilder: Path2DBuilder): Path2D;

  /**
   * A variant of DOM `addEventListener` function that adds event listener to a path object
   * @param type type of event
   * @param listener callback function called when event is fired
   * @param options event listener options
   */
  addEventListener<K extends keyof ElementEventMap>(
    type: K,
    listener: (event: any) => boolean | void,
    options?: boolean | AddEventListenerOptions
  ): void {
    function callback(event: any, rectangle: Rectangle | undefined): void {
      if (rectangle != null && 'offsetX' in event && 'offsetY' in event) {
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;
        if (
          rectangle.x < offsetX &&
          offsetX < rectangle.x + rectangle.width &&
          rectangle.y < offsetY &&
          offsetY < rectangle.y + rectangle.height
        ) {
          listener(event);
        }
      } else {
        listener(event);
      }
    }

    this.delegate.addEventListener(
      type,
      (ev) => callback(ev, this.getPathRectangle()),
      options
    );
  }

  /**
   * Returns the path size
   * @returns size of the path
   */
  getSize(): Size {
    const width = this.getNumberAttribute('width', 0);
    const height = this.getNumberAttribute('height', 0);
    return { width, height };
  }

  /**
   * Returns rectangle wrapping the path
   * @returns path rectangle or undefined when the size is not defied
   */
  getPathRectangle(): Rectangle | undefined {
    const x = this.getNumberAttribute('x', 0);
    const y = this.getNumberAttribute('y', 0);
    const width = this.getNumberAttribute('width');
    const height = this.getNumberAttribute('height');
    if (width == null || height == null) {
      return undefined;
    }

    return { x, y, width, height };
  }

  protected getNumberAttribute(name: string): number | undefined;
  protected getNumberAttribute(name: string, defaultValue: number): number;
  protected getNumberAttribute(
    name: string,
    defaultValue?: number
  ): number | undefined {
    const attribute = this.attributes.get(name);
    if (defaultValue != null) {
      return coerceNumber(attribute, defaultValue);
    } else {
      return coerceNumber(attribute);
    }
  }
}

export class SvgPath extends Path {
  override getPath2D(): Path2D {
    return new Path2D();
  }
}

export class RectanglePath extends Path {
  override getPath2D(pathBuilder: Path2DBuilder): Path2D {
    const attributes: RectangleAttributes = {
      x: this.getNumberAttribute('x', 0),
      y: this.getNumberAttribute('y', 0),
      width: this.getNumberAttribute('width', 0),
      height: this.getNumberAttribute('height', 0),
    };
    return rectangleToPath(attributes, pathBuilder);
  }
}
