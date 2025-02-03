import { Component, inject, input, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from 'shared';

@Component({
  selector: 'lib-auth-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  authForm = input<FormGroup>();
  submit = output<FormGroup>();
  toastService = inject(ToastService);

  onSubmit() {
    this.authForm().markAllAsTouched();
    if(this.authForm().valid){
      this.submit.emit(this.authForm());

    } else {
      console.log('error');      
      this.toastService.emitToast("Error", "Inconsistency in fields", "error", true);
    }
  }

}