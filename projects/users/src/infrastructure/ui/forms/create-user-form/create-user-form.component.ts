import { Component, OnInit, output } from '@angular/core';
import { IUser, IUserCreate } from '../../../../domain/model/user.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputControlComponent } from '../input-control/input-control.component';
import { IFormField } from '../login-form/login-form.component';



@Component({
  selector: 'lib-create-user-form',
  imports: [ReactiveFormsModule, InputControlComponent],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss',
})
export class CreateUserFormComponent {
  onSubmit = output<IUserCreate>();
  trySend: boolean = false;

  formFields: IFormField[] = [];
  createUserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    this.formFields = [
      {
        label: 'Username',
        formGroup: this.createUserForm,
        controlName: 'username',
      },
      {
        label: 'Email',
        formGroup: this.createUserForm,
        controlName: 'email',
        inputType: 'email'
      },
      {
        label: 'Password',
        formGroup: this.createUserForm,
        controlName: 'password',
        inputType: 'password'
      },
    ];
  }

  submit(): void {
    this.trySend = true;
    this.markAsTouched(this.createUserForm);
    if (this.createUserForm.valid) {
      this.onSubmit.emit({
        username: this.createUserForm.get('username')?.value,
        password: this.createUserForm.get('password')?.value,
        email: this.createUserForm.get('email')?.value,
      });
    }
  }

  markAsTouched(form: FormGroup): void {
    if (form) {
      Object.keys(form.controls).forEach((key) => {
        form.get(key)?.markAsTouched();
      });
    }
  }


  clear() {
    this.createUserForm.reset();
    this.createUserForm.markAsPristine();
    this.createUserForm.markAsUntouched();
    this.trySend = false;
  }
}
