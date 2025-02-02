import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDishes } from '../../../../public-api';

@Component({
  selector: 'lib-add-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent {
//  @Input() dishForm!: FormGroup;
//  @Input() formData: { labelName: string; valueLabel: string }[] = [];
//  @Output() save = new EventEmitter<void>();
  @Input() editData: any = null;
  @Output() save = new EventEmitter<any>();

  dishForm!: FormGroup;

  formFields = [
    { labelName: 'Name', valueLabel: 'name', type: 'text' },
    { labelName: 'Price', valueLabel: 'price', type: 'number' },
    { labelName: 'Menu name', valueLabel: 'menuName', type: 'text' },
  ];

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editData'] && this.editData && this.dishForm) {
      this.dishForm.patchValue(this.editData);
    }else{
      this.resetForm();
    }
  }

  private initializeForm(): void {
    this.dishForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      menuName: ['', [Validators.required]],
    });

    if (this.editData) {
      this.dishForm.patchValue(this.editData);
    }
  }

  resetForm(): void {
    this.dishForm.reset();
  }

  onSave(): void {
    if (this.dishForm.valid) {
      this.save.emit(this.dishForm.value);
    }
  }


  

}
