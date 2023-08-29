import { NgComponentOutlet } from '@angular/common';
import { Component, Input, Type } from '@angular/core';

@Component({
  selector: 'acr-renderer',
  standalone: true,
  imports: [NgComponentOutlet],
  template: '<ng-container *ngComponentOutlet="componentToRender ?? null" />',
})
export class RendererComponent {
  @Input() componentToRender: Type<unknown> | null | undefined;
}
