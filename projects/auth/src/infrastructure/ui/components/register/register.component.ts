import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../forms/app-form-input/app-form-input.component';
import { AuthFormComponent } from '../../forms/auth-form/auth-form.component';


@Component({
  selector: 'lib-register',
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    AuthFormComponent,
    FormInputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Input() registerForm: FormGroup;
  @Output() submited = new EventEmitter<FormGroup>();

  constructor() { }
  ngOnInit(): void { }
  onSubmit() {
    if (this.registerForm.valid) {
      this.submited.emit(this.registerForm);
    }
  }
}