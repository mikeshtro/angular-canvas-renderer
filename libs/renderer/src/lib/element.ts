import { Comment } from './comment';
import { Path } from './path';

/**
 * Class for storing elements. Element contains its child svgs
 * represented by path objects and comments
 */
export class Element {
  readonly #comments: Comment[] = [];
  readonly #paths: Path[] = [];

  /**
   * Adds comment to the list of comments
   * @param comment comment to be added
   */
  addComment(comment: Comment): void {
    this.#comments.push(comment);
  }

  /**
   * Adds path to the list of paths
   * @param path path to be added
   */
  addPath(path: Path): void {
    this.#paths.push(path);
  }

  /**
   * @returns list of child paths
   */
  getPaths(): Path[] {
    return this.#paths;
  }
}
