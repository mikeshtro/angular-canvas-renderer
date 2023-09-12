import { Component } from '@angular/core';

@Component({
  selector: 'mikeshtro-test',
  template: `
    <svg width="400" height="110">
      <rect
        width="140"
        height="100"
        fill="rgb(0,0,255)"
        stroke-width="3"
        stroke="rgb(0,0,0)"
      />
    </svg>
  `,
  standalone: true,
})
export class TestComponent {}

@Component({
  selector: 'mikeshtro-test-2',
  template: `
    <svg width="400" height="110">
      <rect
        x="150"
        width="140"
        height="100"
        fill="rgb(255,0,0)"
        stroke-width="3"
        stroke="rgb(0,0,0)"
      />
    </svg>
  `,
  standalone: true,
})
export class Test2Component {}
