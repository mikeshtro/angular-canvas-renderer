import { Comment } from './comment';
import { Path } from './path';
import { Size } from './size';

/**
 * Class for storing elements. Element contains its child svgs
 * represented by path objects and comments
 */
export class Element {
  private readonly comments: Comment[] = [];
  private readonly paths: Path[] = [];
  private readonly elements: Element[] = [];

  /**
   * Adds comment to the list of comments
   * @param comment comment to be added
   */
  addComment(comment: Comment): void {
    this.comments.push(comment);
  }

  /**
   * Adds path to the list of paths
   * @param path path to be added
   */
  addPath(path: Path): void {
    this.paths.push(path);
  }

  /**
   * Adds element to the list of elements
   * @param element element to be added
   */
  addElement(element: Element): void {
    this.elements.push(element);
  }

  /**
   * Returns element size build from its child paths
   * @returns size of the element
   */
  getSize(): Size {
    let width = 0;
    let height = 0;

    for (const path of this.paths) {
      const pathBB = path.getPathRectangle();
      if (pathBB != null && pathBB.x + pathBB.width > width) {
        width = pathBB.x + pathBB.width;
      }
      if (pathBB != null && pathBB.y + pathBB.height > height) {
        height = pathBB.y + pathBB.height;
      }
    }

    return { width, height };
  }

  /**
   * @returns list of child paths
   */
  getPaths(): Path[] {
    return this.paths.concat(
      this.elements.map((element) => element.getPaths()).flat()
    );
  }
}
