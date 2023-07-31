import { Component } from '@angular/core';
import { CanvasComponent } from '@mikeshtro/renderer';

@Component({
  selector: 'mikeshtro-root',
  standalone: true,
  imports: [CanvasComponent],
  template: '<acr-canvas></acr-canvas>',
})
export class AppComponent {}
