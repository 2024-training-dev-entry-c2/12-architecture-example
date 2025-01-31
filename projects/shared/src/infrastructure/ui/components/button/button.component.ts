import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  public text = input.required<string>();
  public theme = input<'primary' | 'info' | 'danger'>('primary');
  public onClick = output<void>();

  handleClick() {
    this.onClick.emit();
  }
}
