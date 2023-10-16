import { Path2DBuilder } from '@mikeshtro/svg';

import { coerceNumber } from './coercion';
import { Rectangle } from './rectangle';
import { RectangleAttributes } from './rectangle-attributes';
import { Size } from './size';
import { rectangleToPath } from './svg';

/**
 * Path object represents path to be rendered it can contain
 * child paths
 */
export class Path {
  private readonly delegate: Element;
  private readonly name: string;
  private readonly attributes = new Map<string, string>();
  private readonly paths: Path[] = [];

  constructor(name: string, delegate: Element) {
    this.name = name;
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
  getPath2D(pathBuilder: Path2DBuilder): Path2D {
    if (this.name === 'svg') {
      return new Path2D();
    }
    if (this.name === 'rect') {
      const attributes: RectangleAttributes = {
        x: this.attributes.get('x'),
        y: this.attributes.get('y'),
        width: this.attributes.get('width'),
        height: this.attributes.get('height'),
      };
      return rectangleToPath(attributes, pathBuilder);
    }

    throw Error(`Element ${this.name} is not supported yet`);
  }

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
    const width = coerceNumber(this.attributes.get('width'), 0);
    const height = coerceNumber(this.attributes.get('height'), 0);
    return { width, height };
  }

  /**
   * Returns rectangle wrapping the path
   * @returns path rectangle or undefined when the size is not defied
   */
  getPathRectangle(): Rectangle | undefined {
    const x = coerceNumber(this.attributes.get('x'), 0);
    const y = coerceNumber(this.attributes.get('y'), 0);
    const width = coerceNumber(this.attributes.get('width'));
    const height = coerceNumber(this.attributes.get('height'));
    if (width == null || height == null) {
      return undefined;
    }

    return { x, y, width, height };
  }
}
