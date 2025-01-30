import { Component, input, output } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet /> <p>{{title()}}</p> <button (click)="handleClick()">Click me</button>',
})
export class AppComponent {
  title = input<string>();
  onClick = output<void>();

  handleClick() {
    this.onClick.emit();
  }
}
