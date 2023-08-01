import { Component } from '@angular/core';
import { CanvasComponent, CanvasContentDirective } from '@mikeshtro/renderer';

@Component({
  selector: 'mikeshtro-root',
  standalone: true,
  imports: [CanvasComponent, CanvasContentDirective],
  template: '<acr-canvas><div *acrCanvasContent>Something</div></acr-canvas>',
})
export class AppComponent {}
