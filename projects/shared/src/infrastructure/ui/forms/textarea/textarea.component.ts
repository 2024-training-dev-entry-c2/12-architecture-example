import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-textarea',
  imports: [ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  public span = input<string>();
  public formGroup = input.required<FormGroup>();
  public formControlName = input.required<string>();
  public placeholder = input<string>();

  notValid(): boolean {
    const control = this.formGroup().get(this.formControlName());
    return !!control?.invalid && control?.touched;
  }

  get errorMessage(): string {
    const control = this.formGroup().get(this.formControlName());
    if (control?.errors?.["required"]) {
      return 'Campo obligatorio.';
    }
    return 'El valor ingresado no es válido.';
  }
}
