import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() formClass: string = '';
  @Input() ariaLabelledby: string = '';
  @Output() onSubmit = new EventEmitter<void>();


}