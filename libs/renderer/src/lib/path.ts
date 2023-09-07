import { coerceNumber } from './coercion';

/**
 * Path object represents path to be rendered it can contain
 * child paths
 */
export class Path {
  readonly #name: string;
  readonly #attributes = new Map<string, string>();
  readonly #paths: Path[] = [];

  constructor(name: string) {
    this.#name = name;
  }

  /**
   * Returns stroke definition if defined by attribute
   */
  getStroke(): string | undefined {
    return this.#attributes.get('stroke');
  }

  /**
   * Returns fill definition if defined by attribute
   */
  getFill(): string | undefined {
    return this.#attributes.get('fill');
  }

  /**
   * Sets attribute vale
   * @param name name of attribute to be set
   * @param value attribute value
   */
  setAttribute(name: string, value: string): void {
    this.#attributes.set(name, value);
  }

  /**
   * Adds given path as a child path
   * @param path child path
   */
  addPath(path: Path): void {
    this.#paths.push(path);
  }

  /**
   * Returns list of all child paths
   */
  getPaths(): Path[] {
    return this.#paths;
  }

  /**
   * Builds `Path2D` object to be rendered from its name
   * and given attributes. This path does not include stroke
   * and fill so it can be defined for each child separately
   */
  getPath2D(): Path2D {
    const result = new Path2D();
    if (this.#name === 'rect') {
      const x = coerceNumber('x', 0);
      const y = coerceNumber('y', 0);
      const width = coerceNumber('width', 0);
      const height = coerceNumber('height', 0);

      result.rect(x, y, width, height);
    }

    return result;
  }
}
