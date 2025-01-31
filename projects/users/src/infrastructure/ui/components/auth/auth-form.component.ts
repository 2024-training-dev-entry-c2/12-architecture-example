import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-form-auth',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {

  loginForm: FormGroup;
  passwordVisible = false;
  error: string | null = null;

  public onLogin = output<{ email: string, password: string }>();

  constructor(private fb: FormBuilder,
    //private authService: AuthService, 
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }


  login() {
    if (this.loginForm.valid) {
      this.onLogin.emit({ email: this.loginForm.value.email, password: this.loginForm.value.password });
      //EMITIR EL EVENTO HACIA EL  CONTAINER
      /*  this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
         next: () => {
           this.router.navigate(['/']);
         },
         error: (err) => {
           this.error = "Invalid credentials, please check your email and password";
         }
       }); */
    } else {
      this.error = "The form is invalid, please check the fields";
    }
  }



  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
