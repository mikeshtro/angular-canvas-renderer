import { Component } from '@angular/core';
import { CanvasComponent } from '@mikeshtro/renderer';

import { Test2Component, TestComponent } from './test.component';

@Component({
  selector: 'mikeshtro-root',
  standalone: true,
  imports: [CanvasComponent],
  template: '<acr-canvas [componentToRender]="componentToRender"></acr-canvas>',
})
export class AppComponent {
  protected componentToRender = [TestComponent, Test2Component];
}
