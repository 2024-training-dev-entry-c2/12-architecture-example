import { Component, input, output } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {
  title = input<string>();
  onClick = output<void>();

  handleClick() {
    this.onClick.emit();
  }
}
