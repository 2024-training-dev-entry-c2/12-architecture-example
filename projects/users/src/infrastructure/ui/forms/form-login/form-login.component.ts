import { Component, input, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-form-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
})
export class FormLoginComponent {
  submit = output<FormGroup>();
  loginForm = input<FormGroup>();

  onSubmit(): void {
    if (this.loginForm().valid) {
      this.submit.emit(this.loginForm());
    } else {
      console.log('error');
    }
  }
}
