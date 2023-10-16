import { Point } from './point';

/**
 * Builder to build path objects
 *
 * Methods are named after svg path commands
 */
export class Path2DBuilder {
  private cursor: Point = { x: 0, y: 0 };
  private path2d = new Path2D();

  /**
   * Creates new builder with cursor at origin or given position
   * @param cursor cursor position where the path should start
   */
  constructor(cursor?: Point) {
    if (cursor != null) {
      this.cursor = cursor;
    }
  }

  /**
   * Move To command with absolute position
   * @param x absolute x position
   * @param y absolute y position
   */
  M(x: number, y: number): this {
    this.path2d.moveTo(x, y);
    this.cursor = { x, y };
    return this;
  }

  /**
   * Move To command with relative position
   * @param dx x position relative to current cursor
   * @param dy y position relative to current cursor
   */
  m(dx: number, dy: number): this {
    const x = this.cursor.x + dx;
    const y = this.cursor.y + dy;
    this.path2d.moveTo(x, y);
    this.cursor = { x, y };
    return this;
  }

  /**
   * Line To command from current position to given absolute position
   * @param x absolute endpoint x position
   * @param y absolute endpoint y position
   */
  L(x: number, y: number): this {
    this.path2d.lineTo(x, y);
    this.cursor = { x, y };
    return this;
  }

  /**
   * Line To command from current position to given relative position
   * @param dx endpoint x position relative to current cursor
   * @param dy endpoint y position relative to current cursor
   */
  l(dx: number, dy: number): this {
    const x = this.cursor.x + dx;
    const y = this.cursor.y + dy;
    this.path2d.lineTo(x, y);
    this.cursor = { x, y };
    return this;
  }

  /**
   * Horizontal Line To command from current cursor position to given absolute
   * position
   * @param x absolute endpoint x position
   */
  H(x: number): this {
    this.path2d.lineTo(x, this.cursor.y);
    this.cursor.x = x;
    return this;
  }

  /**
   * Horizontal Line To command from current cursor position to given relative
   * position
   * @param dx endpoint x position relative to current cursor
   */
  h(dx: number): this {
    const x = this.cursor.x + dx;
    this.path2d.lineTo(x, this.cursor.y);
    this.cursor.x = x;
    return this;
  }

  /**
   * Vertical Line To command from current cursor position to given absolute
   * position
   * @param y absolute endpoint y position
   */
  V(y: number): this {
    this.path2d.lineTo(this.cursor.x, y);
    this.cursor.y = y;
    return this;
  }

  /**
   * Vertical Line To command from current cursor position to given relative
   * position
   * @param dy endpoint y position relative to current cursor
   */
  v(dy: number): this {
    const y = this.cursor.y + dy;
    this.path2d.lineTo(this.cursor.x, y);
    this.cursor.y = y;
    return this;
  }

  /**
   * Close Path command
   */
  Z(): this {
    this.path2d.closePath();
    return this;
  }

  /**
   * Close Path command
   */
  z(): this {
    this.path2d.closePath();
    return this;
  }

  /**
   * Cubic Bézier curve command with absolute point positions
   * @param x1 x position of start point control point
   * @param y1 y position of start point control point
   * @param x2 x position of end point control point
   * @param y2 y position of end point control point
   * @param x x position of end point
   * @param y y position of end point
   */
  C(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x: number,
    y: number
  ): this {
    this.path2d.bezierCurveTo(x1, y1, x2, y2, x, y);
    this.cursor = { x, y };
    return this;
  }

  /**
   * Cubic Bézier curve command with point positions relative to current
   * cursor position
   * @param dx1 x position of start point control point
   * @param dy1 y position of start point control point
   * @param dx2 x position of end point control point
   * @param dy2 y position of end point control point
   * @param dx x position of end point
   * @param dy y position of end point
   */
  c(
    dx1: number,
    dy1: number,
    dx2: number,
    dy2: number,
    dx: number,
    dy: number
  ): this {
    this.path2d.bezierCurveTo(
      this.cursor.x + dx1,
      this.cursor.y + dy1,
      this.cursor.x + dx2,
      this.cursor.y + dy2,
      this.cursor.x + dx,
      this.cursor.y + dy
    );
    this.cursor = { x: this.cursor.x + dx, y: this.cursor.y + dy };
    return this;
  }

  S(x2: number, y2: number, x: number, y: number): this {
    throw Error('Not implemented');
  }

  s(dx2: number, dy2: number, dx: number, dy: number): this {
    throw Error('Not implemented');
  }

  /**
   * Quadratic Bézier curve command with absolute point positions
   * @param x1 x position of control point
   * @param y1 y position of control point
   * @param x x position of end point
   * @param y y position of end point
   */
  Q(x1: number, y1: number, x: number, y: number): this {
    this.path2d.quadraticCurveTo(x1, y1, x, y);
    this.cursor = { x, y };
    return this;
  }

  /**
   * Quadratic Bézier curve command with point positions relative to current
   * cursor position
   * @param dx1 x position of control point
   * @param dy1 y position of control point
   * @param dx x position of end point
   * @param dy y position of end point
   */
  q(dx1: number, dy1: number, dx: number, dy: number): this {
    this.path2d.quadraticCurveTo(
      this.cursor.x + dx1,
      this.cursor.y + dy1,
      this.cursor.x + dx,
      this.cursor.y + dy
    );
    this.cursor = { x: this.cursor.x + dx, y: this.cursor.y + dy };
    return this;
  }

  T(x: number, y: number): this {
    throw Error('Not implemented');
  }

  t(dx: number, dy: number): this {
    throw Error('Not implemented');
  }

  A(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArcFlag: number,
    sweepFlag: number,
    x: number,
    y: number
  ): this {
    throw Error('Not implemented');
  }

  a(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArcFlag: number,
    sweepFlag: number,
    x: number,
    y: number
  ): this {
    throw Error('Not implemented');
  }

  build(): Path2D {
    return this.path2d;
  }
}
