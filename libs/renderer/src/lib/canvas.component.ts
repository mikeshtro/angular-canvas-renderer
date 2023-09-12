import { NgComponentOutlet, NgFor } from '@angular/common';
import {
  Component,
  createEnvironmentInjector,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injector,
  Input,
  OnInit,
  RendererFactory2,
  Type,
  ViewChild,
} from '@angular/core';

import { coerceArray } from './coercion';
import { CanvasRendererFactory } from './renderer';

@Component({
  selector: 'acr-canvas',
  standalone: true,
  imports: [NgComponentOutlet, NgFor],
  template: `
    <canvas #canvas></canvas>
    <ng-template ngFor [ngForOf]="componentToRender" let-component>
      <ng-container
        *ngComponentOutlet="component; injector: componentToRenderInjector"
      />
    </ng-template>
  `,
})
export class CanvasComponent implements OnInit {
  @Input({
    required: true,
    transform: (value: Type<unknown> | Type<unknown>[]) => coerceArray(value),
  })
  componentToRender!: Type<unknown>[];

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
