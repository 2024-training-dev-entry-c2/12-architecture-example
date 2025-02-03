import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-form-field',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  public formGroup = input.required<FormGroup>();
  public controlName = input.required<string>();
  public label = input.required<string>();
  public type = input<string>('text');
  public placeholder = input.required<string>();

  get control(): AbstractControl {
    return this.formGroup().get(this.controlName())!;
  }

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string {
    if (!this.control.errors) return '';

    if (this.control.errors['required']) {
      return 'Este campo es obligatorio.';
    }
    if (this.control.errors['minlength']) {
      return `Debe tener al menos ${this.control.errors['minlength'].requiredLength} caracteres.`;
    }
    if (this.control.errors['email']) {
      return 'Debe ser un correo electrónico válido.';
    }
    if (this.control.errors['pattern']) {
      return 'El formato no es válido.';
    }
    return 'Campo inválido.';
  }
}
