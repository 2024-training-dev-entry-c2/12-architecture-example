import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'lib-dynamic-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss'
})
export class DynamicInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() config!: {
    name: string;
    label: string;
    type?: string;
    options?: { label: string; value: any }[];
    placeholder?: string;
    errorMessage?: string;
  };


  get isArray(): boolean {
    return this.control instanceof FormArray;
  }

  get control(): FormControl | FormArray {
    return this.formGroup.get(this.config.name) as FormControl | FormArray;
  }

  getFormArrayControls(control: FormControl | FormArray): FormControl[] {
    return (control as FormArray).controls as FormControl[];
  }
}