
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserSystem } from '../../../../domain/model/user-system.model';
import { InputFloatComponent } from '../../components/util/input-float/input-float.component';
import { InputComponent } from '../../components/util/input/input.component';
import { ButtonComponent } from '../../components/util/button/button.component';
import { ContainerComponent } from '../../components/util/container/container.component';

@Component({
  selector: 'lib-create-user-form',
  imports: [CommonModule, ReactiveFormsModule, InputFloatComponent, InputComponent, ButtonComponent, ContainerComponent],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
  @Output() onCreate = new EventEmitter<IUserSystem>();

  createUserForm: FormGroup;
  error: string | null = null;
  @Input() disabled: boolean = false;
  @Input() errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.createUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['ADMIN', Validators.required]
    });
  }

  submit() {
    if (this.createUserForm.valid) {
      this.onCreate.emit(this.createUserForm.value as IUserSystem);
    }
    else {
      this.error = "The form is invalid, please check the fields";
    }
  }
  
  resetForm() {
    this.createUserForm.reset();
  }
}
