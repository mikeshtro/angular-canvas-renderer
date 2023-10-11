import { Component } from '@angular/core';
import { CanvasComponent } from '@mikeshtro/renderer';

import { Test3Component } from './test.component';

@Component({
  selector: 'mikeshtro-root',
  standalone: true,
  imports: [CanvasComponent],
  template: '<acr-canvas [componentToRender]="componentToRender"></acr-canvas>',
})
export class AppComponent {
  protected componentToRender = [Test3Component];
}
