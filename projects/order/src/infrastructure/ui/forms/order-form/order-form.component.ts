import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrder } from '../../../../domain/model/orders.model';

@Component({
  selector: 'lib-order-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  private readonly fb = inject(FormBuilder);

  @Input() isEditForm: boolean = false;
  @Input() currentClientName: string = '';
  @Input() currentTotalAmount: number = 0;

  public form: FormGroup = this.fb.group({
    clientName: ['', Validators.required],
    totalAmount: [0, Validators.required],
    orderItems: [[]]
  });

  ngOnChanges(): void {
    if (this.isEditForm && this.currentClientName) {
      this.form.patchValue({ 
        clientName: this.currentClientName,
        totalAmount: this.currentTotalAmount
       });
    } else {
      this.form.reset();
    }
  }

  getFormData(): IOrder | null {
    if (!this.form.valid) {
      return null;
    }
    const formData = this.form.getRawValue();
    if (!formData.orderItems) {
      formData.orderItems = [];
    }
    return formData;
  }

  resetForm(): void {
    this.form.reset();
  }
}
