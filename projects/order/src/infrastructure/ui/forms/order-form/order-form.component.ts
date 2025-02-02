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
  @Input() currentOrderItems: any[] = [];

  public form: FormGroup = this.fb.group({
    clientName: ['', Validators.required],
    orderItems: this.fb.array([])
  });

  ngOnChanges(): void {
    if (this.isEditForm && this.currentClientName) {
      this.form.patchValue({ clientName: this.currentClientName });
      this.setOrderItems(this.currentOrderItems);
    }
  }

  get orderItems() {
    return (this.form.get('orderItems') as FormArray);
  }

  setOrderItems(items: any[]) {
    const control = this.form.get('orderItems') as FormArray;
    items.forEach(item => {
      control.push(this.fb.group({
        dishName: [item.dishName, Validators.required],
        quantity: [item.quantity, Validators.required],
        price: [item.price, Validators.required]
      }));
    });
  }

  getFormData(): IOrder | null {
    if (!this.form.valid) {
      return null;
    }
    return this.form.getRawValue();
  }

  resetForm(): void {
    this.form.reset();
    this.orderItems.clear();
  }
}
