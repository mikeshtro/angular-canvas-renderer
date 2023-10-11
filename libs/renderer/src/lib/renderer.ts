import {
  ElementRef,
  inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  RendererStyleFlags2,
  RendererType2,
} from '@angular/core';

import { Comment } from './comment';
import { renderPath } from './context';
import { Element } from './element';
import { Path } from './path';

@Injectable()
export class CanvasRendererFactory implements RendererFactory2 {
  private readonly delegateFactory = inject(RendererFactory2, {
    skipSelf: true,
  });
  private readonly canvas: ElementRef<HTMLCanvasElement>;

  constructor(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas;
  }

  createRenderer(hostElement: any, type: RendererType2 | null): Renderer2 {
    const delegate = this.delegateFactory.createRenderer(hostElement, type);
    const context = this.canvas.nativeElement.getContext('2d');
    if (context == null) {
      console.warn('Could not find context, using default renderer');
      return delegate;
    }

    return new CanvasRenderer(delegate, context, this.canvas.nativeElement);
  }
}

export class CanvasRenderer implements Renderer2 {
  private readonly delegate: Renderer2;
  private readonly context: CanvasRenderingContext2D;
  private readonly hostElement: HTMLElement;

  constructor(
    delegate: Renderer2,
    context: CanvasRenderingContext2D,
    hostElement: HTMLElement
  ) {
    this.delegate = delegate;
    this.context = context;
    this.hostElement = hostElement;
  }

  get data(): { [key: string]: any } {
    return this.delegate.data;
  }

  destroy(): void {
    this.delegate.destroy();
  }

  createElement(name: string, namespace?: string | null | undefined) {
    if (namespace === 'svg') {
      return new Path(name, this.hostElement);
    }

    return new Element();
  }

  createComment(value: string) {
    return new Comment(value);
  }

  createText(value: string) {
    return this.delegate.createText(value);
  }

  destroyNode = null;

  appendChild(parent: any, newChild: any): void {
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

    this.delegate.appendChild(parent, newChild);
  }

  insertBefore(
    parent: any,
    newChild: any,
    refChild: any,
    isMove?: boolean | undefined
  ): void {
    if (newChild instanceof Element) {
      for (const path of newChild.getPaths()) {
        renderPath(path, this.context);
      }
    } else {
      this.delegate.insertBefore(parent, newChild, refChild, isMove);
    }
  }

  removeChild(
    parent: any,
    oldChild: any,
    isHostElement?: boolean | undefined
  ): void {
    this.delegate.removeChild(parent, oldChild, isHostElement);
  }

  selectRootElement(
    selectorOrNode: any,
    preserveContent?: boolean | undefined
  ) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }

  parentNode(node: any) {
    return this.delegate.parentNode(node);
  }

  nextSibling(node: any) {
    return this.delegate.nextSibling(node);
  }

  setAttribute(
    el: any,
    name: string,
    value: string,
    namespace?: string | null | undefined
  ): void {
    if (el instanceof Path) {
      el.setAttribute(name, value);
      return;
    }

    this.delegate.setAttribute(el, name, value, namespace);
  }

  removeAttribute(
    el: any,
    name: string,
    namespace?: string | null | undefined
  ): void {
    this.delegate.removeAttribute(el, name, namespace);
  }

  addClass(el: any, name: string): void {
    this.delegate.addClass(el, name);
  }

  removeClass(el: any, name: string): void {
    this.delegate.removeClass(el, name);
  }

  setStyle(
    el: any,
    style: string,
    value: any,
    flags?: RendererStyleFlags2 | undefined
  ): void {
    this.delegate.setStyle(el, style, value, flags);
  }

  removeStyle(
    el: any,
    style: string,
    flags?: RendererStyleFlags2 | undefined
  ): void {
    this.delegate.removeStyle(el, style, flags);
  }

  setProperty(el: any, name: string, value: any): void {
    this.delegate.setProperty(el, name, value);
  }

  setValue(node: any, value: string): void {
    if (node instanceof Comment) {
      node.setValue(value);
      return;
    }

    this.delegate.setValue(node, value);
  }

  listen(
    target: any,
    eventName: string,
    callback: (event: any) => boolean | void
  ): () => void {
    return this.delegate.listen(target, eventName, callback);
  }
}
