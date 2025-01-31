import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-button-close',
  imports: [],
  templateUrl: './button-close.component.html',
  styleUrl: './button-close.component.scss'
})
export class ButtonCloseComponent {
  public text = input.required<string>();
  public theme = input<'primary' | 'info' | 'danger'>('primary');
  public onClick = output<void>();

  handleClick() {
    this.onClick.emit();
  }
}
