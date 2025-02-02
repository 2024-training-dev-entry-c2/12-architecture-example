import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IMenu } from 'menus';

@Component({
  selector: 'lib-form-selector',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form-selector.component.html',
  styleUrl: './form-selector.component.scss'
})
export class FormSelectorComponent {
  public formGroup = input.required<FormGroup>();
  public controlName = input.required<string>();
  public label = input.required<string>();
  public menus = input.required<IMenu[]>();

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
    return 'Selección inválida.';
  }
}
