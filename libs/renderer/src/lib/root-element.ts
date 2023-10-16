import { Path2DBuilder } from '@mikeshtro/svg';

import { renderPath } from './context';
import { Element } from './element';
import { Path } from './path';

type RootElementCursor = {
  x: number;
  y: number;
  rowHeight: number;
};

/**
 * Class representing the element which is the root element to which other
 * elements are rendered using the renderer
 */
export class RootElement {
  private readonly htmlElement: HTMLElement;
  private readonly context: CanvasRenderingContext2D;
  private elements: Element[] = [];

  constructor(htmlElement: HTMLElement, context: CanvasRenderingContext2D) {
    this.htmlElement = htmlElement;
    this.context = context;
  }

  /**
   * Inserts the `element` before existing `refElement` or to the end of all
   * elements list and re-renders the context
   * @param element element to be inserted
   * @param refElement element before which the new element should be inserted
   */
  insertBefore(element: Element, refElement: any): void {
    const index =
      refElement instanceof Element ? this.elements.indexOf(refElement) : -1;
    const elementsBefore = this.elements.slice(
      0,
      index < 0 ? this.elements.length : index
    );
    const rootBB = this.htmlElement.getBoundingClientRect();

    let cursor: RootElementCursor = { x: 0, y: 0, rowHeight: 0 };

    for (const elementBefore of elementsBefore) {
      cursor = this.moveCursor(cursor, elementBefore, rootBB.width);
    }

    for (const path of element.getPaths()) {
      const pathBuilder = new Path2DBuilder(cursor);
      renderPath(path, pathBuilder, this.context);
      cursor = this.moveCursor(cursor, path, rootBB.width);
    }

    this.elements.push(element);

    // TODO: render elements after
  }

  /**
   * @returns the root HTML element
   */
  getHtmlElement(): HTMLElement {
    return this.htmlElement;
  }

  private moveCursor(
    cursor: RootElementCursor,
    element: Path | Element,
    maxWidth: number
  ): RootElementCursor {
    const newCursor = { ...cursor };
    const { width, height } = element.getSize();

    if (newCursor.rowHeight < height) {
      newCursor.rowHeight = height;
    }

    if (newCursor.x + width < maxWidth) {
      newCursor.x += width;
    } else {
      newCursor.y += newCursor.rowHeight;
      newCursor.x = 0;
      newCursor.rowHeight = 0;
    }

    return newCursor;
  }
}
