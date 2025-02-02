import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-app-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './app-form-input.component.html',
  styleUrl: './app-form-input.component.scss',
})
export class FormInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() type: string = 'text';
  @Input() controlName: string = '';
  @Input() inputClass: string = '';
  @Input() placeholder: string = '';
  @Input() ariaLabel: string = '';
  @Input() id: string = '';
}
