import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'lib-add-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent {
    @Input() clientForm!: FormGroup;
    @Input() formData: { labelName: string; valueLabel: string }[] = [];
    @Output() save = new EventEmitter<void>();

  
}

