import { Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../../../domain/models/select-component.model';

@Component({
  selector: 'lib-select',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
})
export class SelectComponent<T> implements ControlValueAccessor {
  public options = input<SelectOption<T>[]>([]);
  public placeholder = input<string>('Select an option');
  public selectionChange = output<T>();

  public isOpen = false;
  public selectedLabel = '';
  public value: T | null = null;
  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: T): void {
    this.value = value;
    const selected = this.options()?.find((opt) => opt.value === value);
    this.selectedLabel = selected?.label || '';
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.onTouched();
    }
  }

  onSelect(option: SelectOption<T>): void {
    this.value = option.value;
    this.selectedLabel = option.label;
    this.onChange(this.value);
    this.onTouched();
    this.selectionChange.emit(option.value);
    this.isOpen = false;
  }
}
