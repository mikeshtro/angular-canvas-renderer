import {
  Component,
  ContentChild,
  createEnvironmentInjector,
  EnvironmentInjector,
  inject,
  RendererFactory2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { CanvasContentDirective } from './canvas-content.directive';
import { CanvasRendererFactory } from './renderer';
import { RendererComponent } from './renderer.component';

@Component({
  selector: 'acr-canvas',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  providers: [],
})
export class CanvasComponent {
  private readonly injector = inject(EnvironmentInjector);

  @ViewChild('canvas', { read: ViewContainerRef })
  private readonly viewRef!: ViewContainerRef;

  @ContentChild(CanvasContentDirective, { read: TemplateRef })
  private readonly templateRef: TemplateRef<unknown> | null | undefined;

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
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

      const component = this.viewRef.createComponent(RendererComponent, {
        environmentInjector: providers,
      });

      component.setInput('template', this.templateRef);
    });
  }
}
