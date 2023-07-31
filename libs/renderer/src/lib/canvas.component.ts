import {
  Component,
  createEnvironmentInjector,
  EnvironmentInjector,
  inject,
  RendererFactory2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { CanvasRendererFactory } from './renderer';
import { RendererComponent } from './renderer.component';

@Component({
  selector: 'acr-canvas',
  standalone: true,
  template: ` <canvas #canvas></canvas> `,
  providers: [],
})
export class CanvasComponent {
  private readonly injector = inject(EnvironmentInjector);

  @ViewChild('canvas', { read: ViewContainerRef })
  private readonly viewRef!: ViewContainerRef;

  ngAfterViewInit(): void {
    const providers = createEnvironmentInjector(
      [
        {
          provide: RendererFactory2,
          useFactory: () => {
            return new CanvasRendererFactory();
          },
        },
      ],
      this.injector
    );

    this.viewRef.createComponent(RendererComponent, {
      environmentInjector: providers,
    });
  }
}
