import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IOptions } from '../../../../public-api';

@Component({
  selector: 'lib-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  public span = input<string>();
  public formControlName = input.required<string>();
  public formGroup = input.required<FormGroup>();
  public placeholder = input<string>();
  public options = input<IOptions[]>();

  writeValue(obj: any): void {
    if (obj) {
      this.formGroup().get(this.formControlName())?.setValue(obj, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup().get(this.formControlName())?.disable();
    } else {
      this.formGroup().get(this.formControlName())?.enable();
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
    return 'El valor seleccionado no es válido.';
  }
}