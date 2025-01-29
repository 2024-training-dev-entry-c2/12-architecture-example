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
    console.log(this.formFields);
    
  }
}
