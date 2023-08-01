import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'acr-renderer',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: '<ng-container *ngTemplateOutlet="template ?? null" />',
})
export class RendererComponent {
  @Input() template: TemplateRef<unknown> | null | undefined;
}
