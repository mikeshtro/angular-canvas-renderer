import {
  Component,
  createEnvironmentInjector,
  ElementRef,
  EnvironmentInjector,
  inject,
  Input,
  RendererFactory2,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { CanvasRendererFactory } from './renderer';
import { RendererComponent } from './renderer.component';

@Component({
  selector: 'acr-canvas',
  standalone: true,
  template: '<canvas #canvas></canvas>',
})
export class CanvasComponent {
  @Input({ required: true }) componentToRender!: Type<unknown>;

  private readonly injector = inject(EnvironmentInjector);
  private readonly viewContainerRef = inject(ViewContainerRef);

  @ViewChild('canvas') private readonly canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      const providers = createEnvironmentInjector(
        [
          {
            provide: RendererFactory2,
            useFactory: () => new CanvasRendererFactory(this.canvas),
          },
        ],
        this.injector
      );

      const component = this.viewContainerRef.createComponent(
        RendererComponent,
        {
          environmentInjector: providers,
        }
      );

      component.setInput('componentToRender', this.componentToRender);
    });
  }
}
