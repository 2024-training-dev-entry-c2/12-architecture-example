import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputControlComponent } from '../input-control/input-control.component';
import { IUser } from '../../../../domain/model/user.model';


export interface IFormField {
  label: string;
  controlName: string;
  formGroup?: FormGroup;
  type?: string;
  options?: { label: string; value: string }[];
  inputType?: string;
}

@Component({
  selector: 'lib-login-form',
  imports: [ReactiveFormsModule, InputControlComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  onSubmit = output<IUser>();
  trySend: boolean = false;

  formFields: IFormField[] = [];
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.formFields = [
      {
        label: 'Username',
        formGroup: this.loginForm,
        controlName: 'username',
      },
      {
        label: 'Password',
        formGroup: this.loginForm,
        controlName: 'password',
        inputType: 'password'
      },
    ];
  }

  submit(): void {
    this.trySend = true;
    this.markAsTouched(this.loginForm);
    if (this.loginForm.valid) {
      this.onSubmit.emit({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      });
    }
  }

  markAsTouched(form: FormGroup): void {
    console.log('tocuhed');
    if (form) {
      Object.keys(form.controls).forEach((key) => {
        form.get(key)?.markAsTouched();
      });
    }
  }

}
