import { Component } from '@angular/core';

@Component({
  selector: 'acr-renderer',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class RendererComponent {}
