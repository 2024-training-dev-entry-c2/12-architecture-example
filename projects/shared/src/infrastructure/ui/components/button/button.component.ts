import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  standalone: true,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() text: string = '';
  @Input() style: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClick.emit();
  }
}
