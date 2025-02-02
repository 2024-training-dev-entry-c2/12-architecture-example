import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'lib-form-input',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor, OnInit {
  @Input() icon: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() formControlName: string = '';

  value: any;
  disabled: boolean = false;
  safeIcon!: SafeHtml;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safeIcon = this.sanitizer.bypassSecurityTrustHtml(this.icon);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }
}
