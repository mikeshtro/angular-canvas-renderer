import {
  Component,
  createEnvironmentInjector,
  EnvironmentInjector,
  inject,
  Input,
  RendererFactory2,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { CanvasRendererFactory } from './renderer';
import { RendererComponent } from './renderer.component';

@Component({
  selector: 'acr-canvas',
  standalone: true,
  template: '',
  providers: [],
})
export class CanvasComponent {
  @Input({ required: true }) componentToRender!: Type<unknown>;

  private readonly injector = inject(EnvironmentInjector);
  private readonly viewContainerRef = inject(ViewContainerRef);

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
