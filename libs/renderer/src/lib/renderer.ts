import { Injectable, Renderer2, RendererStyleFlags2 } from '@angular/core';

export class CanvasRenderer implements Renderer2 {
  readonly #delegate: Renderer2;

  constructor(delegate: Renderer2) {
    this.#delegate = delegate;
  }

  get data(): { [key: string]: any } {
    return this.#delegate.data;
  }

  destroy(): void {
    this.#delegate.destroy();
  }

  createElement(name: string, namespace?: string | null | undefined) {
    return this.#delegate.createElement(name, namespace);
  }

  createComment(value: string) {
    return this.#delegate.createComment(value);
  }

  createText(value: string) {
    return this.#delegate.createText(value);
  }

  destroyNode = null;

  appendChild(parent: any, newChild: any): void {
    this.#delegate.appendChild(parent, newChild);
  }

  insertBefore(
    parent: any,
    newChild: any,
    refChild: any,
    isMove?: boolean | undefined
  ): void {
    this.#delegate.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(
    parent: any,
    oldChild: any,
    isHostElement?: boolean | undefined
  ): void {
    this.#delegate.removeChild(parent, oldChild, isHostElement);
  }

  selectRootElement(
    selectorOrNode: any,
    preserveContent?: boolean | undefined
  ) {
    return this.#delegate.selectRootElement(selectorOrNode, preserveContent);
  }

  parentNode(node: any) {
    return this.#delegate.parentNode(node);
  }

  nextSibling(node: any) {
    return this.#delegate.nextSibling(node);
  }

  setAttribute(
    el: any,
    name: string,
    value: string,
    namespace?: string | null | undefined
  ): void {
    this.#delegate.setAttribute(el, name, value, namespace);
  }

  removeAttribute(
    el: any,
    name: string,
    namespace?: string | null | undefined
  ): void {
    this.#delegate.removeAttribute(el, name, namespace);
  }

  addClass(el: any, name: string): void {
    this.#delegate.addClass(el, name);
  }

  removeClass(el: any, name: string): void {
    this.#delegate.removeClass(el, name);
  }

  setStyle(
    el: any,
    style: string,
    value: any,
    flags?: RendererStyleFlags2 | undefined
  ): void {
    this.#delegate.setStyle(el, style, value, flags);
  }

  removeStyle(
    el: any,
    style: string,
    flags?: RendererStyleFlags2 | undefined
  ): void {
    this.#delegate.removeStyle(el, style, flags);
  }

  setProperty(el: any, name: string, value: any): void {
    this.#delegate.setProperty(el, name, value);
  }

  setValue(node: any, value: string): void {
    this.#delegate.setValue(node, value);
  }

  listen(
    target: any,
    eventName: string,
    callback: (event: any) => boolean | void
  ): () => void {
    return this.#delegate.listen(target, eventName, callback);
  }
}
