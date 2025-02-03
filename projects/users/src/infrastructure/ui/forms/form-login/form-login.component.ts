import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthenticateIn } from '../../../../domain/model/authenticate-in.modle';

@Component({
  selector: 'lib-form-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {

  loginForm: FormGroup;
  passwordVisible = false;
  error: string | null = null;

  public onLogin = output<IAuthenticateIn>();

  constructor(private fb: FormBuilder,
    //private authService: AuthService, 
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  @Input()
  set errorMessage(value: string) {
    this.error = value;
  }

  login() {
    if (this.loginForm.valid) {
      this.onLogin.emit({ email: this.loginForm.value.email, password: this.loginForm.value.password } as IAuthenticateIn);
    } else {
      this.error = "The form is invalid, please check the fields";
    }
  }



  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
