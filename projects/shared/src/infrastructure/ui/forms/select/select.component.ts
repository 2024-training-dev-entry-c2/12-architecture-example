import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOptions } from 'shared';

@Component({
  selector: 'lib-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  public span = input<string>();
  public formControlName = input.required<string>();
  public formGroup = input.required<FormGroup>();
  public placeholder = input<string>();
  public options = input<IOptions[]>();


  notValid(): boolean {
    const controlValidator = this.formGroup().get(this.formControlName());
    return !!controlValidator?.invalid && controlValidator?.touched;
  }


  get errorMessage(): string {
    const controlValidator = this.formGroup().get(this.formControlName());
    if (controlValidator?.errors?.["required"]) {
      return 'Campo obligatorio.';
    }
    return 'El valor seleccionado no es válido.';
  }
}