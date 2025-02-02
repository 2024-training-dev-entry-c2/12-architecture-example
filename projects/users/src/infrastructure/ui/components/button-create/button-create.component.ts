import { CommonModule } from '@angular/common';
import { Component, input, output, Pipe } from '@angular/core';

@Component({
  selector: 'lib-button-create',
  imports: [CommonModule],
  templateUrl: './button-create.component.html',
  styleUrl: './button-create.component.scss',
})
export class ButtonCreateComponent {
  title = input<string>();
  subtitle = input<string>();
  button_name = input<string>();
  icon = input<string>();
  actionClick = output();

  action() {
    this.actionClick.emit();
  }
}
