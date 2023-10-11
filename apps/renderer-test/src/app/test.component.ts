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
        (click)="onClick($event)"
      />
    </svg>
  `,
  standalone: true,
})
export class TestComponent {
  protected onClick(event: any): void {
    console.log('event 1');
  }
}

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
        (click)="onClick($event)"
      />
    </svg>
  `,
  standalone: true,
})
export class Test2Component {
  protected onClick(event: any): void {
    console.log('event 2');
  }
}

@Component({
  selector: 'mikeshtro-test-3',
  imports: [TestComponent, Test2Component],
  template: `
    <mikeshtro-test />
    <mikeshtro-test-2 />
  `,
  standalone: true,
})
export class Test3Component {}
