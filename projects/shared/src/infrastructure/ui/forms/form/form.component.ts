import { Component, Input } from '@angular/core';
import { FormField } from '../../../../domain/model/form.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() formFields: FormField[] = [];
  @Input() formGroup!: FormGroup; 
  
  ngOnInit(): void {
    if (!this.formGroup || !(this.formGroup instanceof FormGroup)) {
      console.error('formGroup is not provided or is not an instance of FormGroup.');
      this.formGroup = new FormGroup({}); // Asignar un FormGroup vacío como fallback
    }
    console.log(this.formFields);
  }
}
