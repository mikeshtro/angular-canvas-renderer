import {
  CommonAttributes,
  isCommonAttribute,
  Path2DBuilder,
} from '@mikeshtro/svg';

import { Rectangle } from '../rectangle';
import { Size } from '../size';

/**
 * Path object represents path to be rendered it can contain
 * child paths
 */
export abstract class Path<
  TAttributes extends CommonAttributes = CommonAttributes
> {
  private readonly delegate: Element;
  private readonly paths: Path[] = [];

  protected readonly attributes: Partial<TAttributes> & CommonAttributes = {};

  constructor(delegate: Element) {
    this.delegate = delegate;
  }

  /**
   * Returns stroke definition if defined by attribute
   */
  getStroke(): string | undefined {
    return this.attributes['stroke'];
  }

  /**
   * Returns fill definition if defined by attribute
   */
  getFill(): string | undefined {
    return this.attributes['fill'];
  }

  /**
   * Sets attribute vale
   * @param name name of attribute to be set
   * @param value attribute value
   */
  setAttribute(name: string, value: string): void {
    if (isCommonAttribute(name)) {
      this.attributes[name] = value;
    }
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
   * Builds `Path2D` object to be rendered from its name
   * and given attributes. This path does not include stroke
   * and fill so it can be defined for each child separately
   * @param pathBuilder builder used to build the path
   */
  abstract getPath2D(pathBuilder: Path2DBuilder): Path2D;

  /**
   * Returns the path size
   * @returns size of the path
   */
  abstract getSize(): Size;

  /**
   * Returns rectangle wrapping the path
   * @returns path rectangle or undefined when the size is not defied
   */
  abstract getPathRectangle(): Rectangle | undefined;
}
