import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  public text = input<string>();
  public type = input<string>();
  public formControlName = input.required<string>();
  public formGroup = input.required<FormGroup>();
  public placeholder = input<string>();
  public value: string = '';

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    const control = this.formGroup().get(this.formControlName());
    if (isDisabled) {
      control?.disable();
    } else {
      control?.enable();
    }
  }

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
      return `El valor mínimo es ${controlValidator?.errors?.["min"]?.min}`;
    }
    return 'El valor ingresado no es válido.';
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.onChange(inputElement.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}