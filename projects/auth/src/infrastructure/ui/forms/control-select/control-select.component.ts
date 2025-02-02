import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-control-select',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './control-select.component.html',
  styleUrl: './control-select.component.scss',
})
export class ControlSelectComponent {
  title = input<string>();
  id = input<string>();
  error = input<boolean>();
  errorMessage = input<string>();
  control = input<FormControl>();
  default = input<string>('');
  options = input<string[]>();
  change = output();

  onValueChange() {
    this.change.emit();
  }
}
