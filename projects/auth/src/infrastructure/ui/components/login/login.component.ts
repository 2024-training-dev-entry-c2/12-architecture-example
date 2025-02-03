
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../forms/app-form-input/app-form-input.component';
import { AuthFormComponent } from '../../forms/auth-form/auth-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPiggyBank } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-login',
  imports: [ReactiveFormsModule, AuthFormComponent, FormInputComponent, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  faUserPlus = faUserPlus;
  faPiggyBank = faPiggyBank;
  @Input() loginForm: FormGroup;
  @Output() submited = new EventEmitter<FormGroup>();

  constructor() { }
  ngOnInit(): void { }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submited.emit(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
