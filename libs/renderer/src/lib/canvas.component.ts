import { NgComponentOutlet } from '@angular/common';
import {
  Component,
  createEnvironmentInjector,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injector,
  Input,
  RendererFactory2,
  Type,
  ViewChild,
} from '@angular/core';

import { CanvasRendererFactory } from './renderer';

@Component({
  selector: 'acr-canvas',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    <canvas #canvas></canvas>
    <ng-container
      *ngComponentOutlet="
        componentToRender;
        injector: componentToRenderInjector
      "
    />
  `,
})
export class CanvasComponent {
  @Input({ required: true }) componentToRender!: Type<unknown>;

  private readonly injector = inject(EnvironmentInjector);

  protected componentToRenderInjector: Injector | undefined;

  @ViewChild('canvas', { static: true })
  private readonly canvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    this.componentToRenderInjector = createEnvironmentInjector(
      [
        {
          provide: RendererFactory2,
          useFactory: () => new CanvasRendererFactory(this.canvas),
        },
      ],
      this.injector
    );
  }
}
