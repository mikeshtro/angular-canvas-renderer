import { coerceNumber } from './coercion';

/**
 * Path object represents path to be rendered it can contain
 * child paths
 */
export class Path {
  private readonly name: string;
  private readonly attributes = new Map<string, string>();
  private readonly paths: Path[] = [];

  constructor(name: string) {
    this.name = name;
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
   */
  getPath2D(): Path2D {
    const result = new Path2D();
    if (this.name === 'rect') {
      const x = this.coerceNumberAttribute('x');
      const y = this.coerceNumberAttribute('y');
      const width = this.coerceNumberAttribute('width');
      const height = this.coerceNumberAttribute('height');

      result.rect(x, y, width, height);
    }

    return result;
  }

  private coerceNumberAttribute(name: string): number {
    return coerceNumber(this.attributes.get(name) ?? '0', 0);
  }
}
