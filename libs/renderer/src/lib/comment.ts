/**
 * Class for storing comments currently unused just saving values
 * so the renderer does not fail
 */
export class Comment {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Updates comment value
   * @param value comment value
   */
  setValue(value: string): void {
    this.value = value;
  }
}
