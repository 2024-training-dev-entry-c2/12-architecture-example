import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterRequest } from '../../../../domain/model/register.request.model';
import { ControlInputComponent } from '../control-input/control-input.component';
import { ControlSelectComponent } from '../control-select/control-select.component';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';

@Component({
  selector: 'lib-register-form',
  imports: [
    ReactiveFormsModule,
    ControlInputComponent,
    ControlSelectComponent,
    ButtonSubmitComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  registerForm!: FormGroup;
  onSubmit = output<RegisterRequest>();

  registerErrors = {
    emailError: false,
    passwordError: false,
    roleError: false,
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
          ),
        ],
      ],
      role: ['', Validators.required],
    });
  }

  submit() {
    if (this.registerForm.valid) {
      this.onSubmit.emit({
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        role: this.registerForm.get('role').value,
      });
    } else {
      if (this.registerForm.get('email')?.invalid) {
        this.registerErrors.emailError = true;
      }
      if (this.registerForm.get('password')?.invalid) {
        this.registerErrors.passwordError = true;
      }
      if (this.registerForm.get('role')?.invalid) {
        this.registerErrors.roleError = true;
      }
    }
  }

  onValueChange(value: keyof typeof this.registerErrors) {
    this.registerErrors[value] = false;
  }

  getFormControl(value: string): FormControl {
    return this.registerForm.get(value) as FormControl;
  }
}
