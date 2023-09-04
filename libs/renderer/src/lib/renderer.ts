import {
  ElementRef,
  inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  RendererStyleFlags2,
  RendererType2,
} from '@angular/core';

@Injectable()
export class CanvasRendererFactory implements RendererFactory2 {
  readonly #delegateFactory = inject(RendererFactory2, { skipSelf: true });
  readonly #canvas: ElementRef<HTMLCanvasElement>;

  constructor(canvas: ElementRef<HTMLCanvasElement>) {
    this.#canvas = canvas;
  }

  createRenderer(hostElement: any, type: RendererType2 | null): Renderer2 {
    const delegate = this.#delegateFactory.createRenderer(hostElement, type);
    const context = this.#canvas.nativeElement.getContext('2d');
    if (context == null) {
      console.warn('Could not find context, using default renderer');
      return delegate;
    }

    return new CanvasRenderer(delegate, context);
  }
}

class Comment {
  #value: string;

  constructor(value: string) {
    this.#value = value;
  }

  setValue(value: string): void {
    this.#value = value;
  }
}

class Element {
  readonly #comments: Comment[] = [];
  readonly #paths: Path[] = [];

  addComment(comment: Comment): void {
    this.#comments.push(comment);
  }

  addPath(path: Path): void {
    this.#paths.push(path);
  }

  getPaths(): Path[] {
    return this.#paths;
  }
}

class Path {
  readonly #name: string;
  readonly #path: Path2D;
  readonly #attributes = new Map<string, string>();
  readonly #paths: Path[] = [];

  constructor(name: string, path: Path2D) {
    this.#name = name;
    this.#path = path;
  }

  getName(): string {
    return this.#name;
  }

  getStroke(): string | undefined {
    return this.#attributes.get('stroke');
  }

  getFill(): string | undefined {
    return this.#attributes.get('fill');
  }

  setAttribute(name: string, value: string): void {
    this.#attributes.set(name, value);
  }

  addPath(path: Path): void {
    this.#paths.push(path);
  }

  getPaths(): Path[] {
    return this.#paths;
  }

  getPath2D(): Path2D {
    const result = new Path2D(this.#path);
    if (this.#name === 'rect') {
      const x = this.#getNumberAttribute('x');
      const y = this.#getNumberAttribute('y');
      const width = this.#getNumberAttribute('width');
      const height = this.#getNumberAttribute('height');

      result.rect(x ?? 0, y ?? 0, width ?? 0, height ?? 0);
    }

    return result;
  }

  #getNumberAttribute(name: string): number | undefined {
    const attribute = Number(this.#attributes.get(name));
    return !isNaN(attribute) ? attribute : undefined;
  }
}

export class CanvasRenderer implements Renderer2 {
  readonly #delegate: Renderer2;
  readonly #context: CanvasRenderingContext2D;

  readonly #elements: Element[] = [];

  constructor(delegate: Renderer2, context: CanvasRenderingContext2D) {
    this.#delegate = delegate;
    this.#context = context;
  }

  get data(): { [key: string]: any } {
    console.log({ type: 'data', data: this.#delegate.data });
    return this.#delegate.data;
  }

  destroy(): void {
    this.#delegate.destroy();
  }

  createElement(name: string, namespace?: string | null | undefined) {
    console.log({ type: 'createElement', name, namespace });

    if (namespace === 'svg') {
      return new Path(name, new Path2D());
    }

    const element = new Element();
    this.#elements.push(element);
    return element;
  }

  createComment(value: string) {
    console.log({ type: 'createComment', value });
    return new Comment(value);
  }

  createText(value: string) {
    console.log({ type: 'createText', value });
    return this.#delegate.createText(value);
  }

  destroyNode = null;

  appendChild(parent: any, newChild: any): void {
    console.log({ type: 'appendChild', parent, newChild });

    if (parent instanceof Element) {
      if (newChild instanceof Comment) {
        parent.addComment(newChild);
        return;
      }
      if (newChild instanceof Path) {
        parent.addPath(newChild);
        return;
      }
    }

    if (parent instanceof Path && newChild instanceof Path) {
      parent.addPath(newChild);
      return;
    }

    this.#delegate.appendChild(parent, newChild);
  }

  insertBefore(
    parent: any,
    newChild: any,
    refChild: any,
    isMove?: boolean | undefined
  ): void {
    console.log({ type: 'insertBefore', parent, newChild, refChild, isMove });

    if (newChild instanceof Element) {
      for (const path of newChild.getPaths()) {
        this.#renderPath(path);
      }
      return;
    }

    this.#delegate.insertBefore(parent, newChild, refChild, isMove);
  }

  #renderPath(path: Path): void {
    const stroke = path.getStroke();
    const fill = path.getFill();
    const path2d = path.getPath2D();
    if (fill != null) {
      this.#context.fillStyle = fill;
      this.#context.fill(path2d);
    }
    if (stroke != null) {
      this.#context.strokeStyle = stroke;
      this.#context.stroke(path2d);
    }
    for (const childPath of path.getPaths()) {
      this.#renderPath(childPath);
    }
  }

  removeChild(
    parent: any,
    oldChild: any,
    isHostElement?: boolean | undefined
  ): void {
    console.log({ type: 'removeChild', parent, oldChild, isHostElement });
    this.#delegate.removeChild(parent, oldChild, isHostElement);
  }

  selectRootElement(
    selectorOrNode: any,
    preserveContent?: boolean | undefined
  ) {
    console.log({ type: 'selectRootElement', selectorOrNode, preserveContent });
    return this.#delegate.selectRootElement(selectorOrNode, preserveContent);
  }

  parentNode(node: any) {
    console.log({ type: 'parentNode', node });
    return this.#delegate.parentNode(node);
  }

  nextSibling(node: any) {
    console.log({ type: 'nextSibling', node });
    return this.#delegate.nextSibling(node);
  }

  setAttribute(
    el: any,
    name: string,
    value: string,
    namespace?: string | null | undefined
  ): void {
    console.log({ type: 'setAttribute', el, name, value, namespace });

    if (el instanceof Path) {
      el.setAttribute(name, value);
      return;
    }

    this.#delegate.setAttribute(el, name, value, namespace);
  }

  removeAttribute(
    el: any,
    name: string,
    namespace?: string | null | undefined
  ): void {
    console.log({ type: 'removeAttribute', el, name, namespace });
    this.#delegate.removeAttribute(el, name, namespace);
  }

  addClass(el: any, name: string): void {
    console.log({ type: 'addClass', el, name });
    this.#delegate.addClass(el, name);
  }

  removeClass(el: any, name: string): void {
    console.log({ type: 'removeClass', el, name });
    this.#delegate.removeClass(el, name);
  }

  setStyle(
    el: any,
    style: string,
    value: any,
    flags?: RendererStyleFlags2 | undefined
  ): void {
    console.log({ type: 'setStyle', el, style, value, flags });
    this.#delegate.setStyle(el, style, value, flags);
  }

  removeStyle(
    el: any,
    style: string,
    flags?: RendererStyleFlags2 | undefined
  ): void {
    console.log({ type: 'removeStyle', el, style, flags });
    this.#delegate.removeStyle(el, style, flags);
  }

  setProperty(el: any, name: string, value: any): void {
    console.log({ type: 'setProperty', el, name });
    this.#delegate.setProperty(el, name, value);
  }

  setValue(node: any, value: string): void {
    console.log({ type: 'setValue', node, value });

    if (node instanceof Comment) {
      node.setValue(value);
      return;
    }

    this.#delegate.setValue(node, value);
  }

  listen(
    target: any,
    eventName: string,
    callback: (event: any) => boolean | void
  ): () => void {
    console.log({ type: 'listen', target, eventName });
    return this.#delegate.listen(target, eventName, callback);
  }
}
