import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-textarea',
  imports: [ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {
  public span = input<string>();
  public formGroup = input.required<FormGroup>();
  public formControlName = input.required<string>();
  public placeholder = input<string>();

  private onTouched: () => void = () => {};

  writeValue(obj: any): void {
    if (obj) {
      this.formGroup().get(this.formControlName())?.setValue(obj);
    }
  }
  
  registerOnChange(fn: any): void {
    this.formGroup().get(this.formControlName())?.valueChanges.subscribe(fn);
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
