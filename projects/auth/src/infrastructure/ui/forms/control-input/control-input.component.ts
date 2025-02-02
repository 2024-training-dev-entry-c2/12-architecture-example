import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-control-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './control-input.component.html',
  styleUrl: './control-input.component.scss',
})
export class ControlInputComponent {
  title = input<string>();
  id = input<string>();
  error = input<boolean>();
  errorMessage = input<string>();
  control = input<FormControl>();
  type = input<string>('text');
  placeholder = input<string>('');
  change = output();

  onValueChange() {
    this.change.emit();
  }
}
