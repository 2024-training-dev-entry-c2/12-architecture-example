import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  public text = input<string>();
  public type = input<string>();
  public formControlName = input.required<string>();
  public formGroup = input.required<FormGroup>();
  public placeholder = input<string>();

  notValid(): boolean {
    const controlValidator = this.formGroup().get(this.formControlName());
    return !!controlValidator?.invalid && controlValidator?.touched;
  }

  get errorMessage(): string {
    const controlValidator = this.formGroup().get(this.formControlName());
    if (controlValidator?.errors?.["required"]) {
      return 'Campo obligatorio.';
    }
    if (controlValidator?.errors?.["email"]) {
      return 'Ingrese un email válido.';
    }
    if (controlValidator?.errors?.["min"]) {
      return `El valor mínimo es ${controlValidator?.errors["min"].min}`;
    }
    return 'El valor ingresado no es válido.';
  }
}