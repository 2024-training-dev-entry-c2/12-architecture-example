import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'lib-add-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent {

  @Input() editData: any = null;
  @Output() save = new EventEmitter<any>();

  clientForm!: FormGroup;

  formFields = [
    { labelName: 'Name', valueLabel: 'name', type: 'text' },
    { labelName: 'Email', valueLabel: 'email', type: 'email' },
    
  ];

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editData'] && this.editData && this.clientForm) {
      this.clientForm.patchValue(this.editData);
    }else{
      this.resetForm();
    }
  }

  private initializeForm(): void {
    this.clientForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });

    if (this.editData) {
      this.clientForm.patchValue(this.editData);
    }
  }

  resetForm(): void {
    this.clientForm.reset();
  }

  onSave(): void {
    if (this.clientForm.valid) {
      this.save.emit(this.clientForm.value);
    }
  }
  
}

