import { Component, OnInit, output } from '@angular/core';
import { LoginRequest } from '../../../../domain/model/login.request.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ControlInputComponent } from '../control-input/control-input.component';
import { ButtonSubmitComponent } from '../../components/button-submit/button-submit.component';

@Component({
  selector: 'lib-login-form',
  imports: [ReactiveFormsModule, ControlInputComponent, ButtonSubmitComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  onSubmit = output<LoginRequest>();

  public loginErrors = {
    emailError: false,
    passwordError: false,
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.onSubmit.emit({
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      });
    } else {
      if (this.loginForm.get('email')?.invalid) {
        this.loginErrors.emailError = true;
      }
      if (this.loginForm.get('password')?.invalid) {
        this.loginErrors.passwordError = true;
      }
    }
  }

  onValueChange(value: keyof typeof this.loginErrors) {
    this.loginErrors[value] = false;
  }

  getFormControl(value: string): FormControl {
    return this.loginForm.get(value) as FormControl;
  }
}
