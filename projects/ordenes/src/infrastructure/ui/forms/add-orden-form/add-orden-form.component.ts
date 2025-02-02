import { Component, inject, Input, output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICreateOrden } from '../../../../domain/model/create-orden.model';

@Component({
  selector: 'lib-add-orden-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-orden-form.component.html',
  styleUrl: './add-orden-form.component.scss',
})
export class AddOrdenFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  public onSubmit = output<ICreateOrden>();
  public statusChange = output<{ idOrden: number; statusOrder: string }>();

  @Input()
  set orden(value: ICreateOrden) {
    if (!value || !value.id) {
      this.ordenForm.reset({
        priceTotal: 0,
        statusOrder: 'PENDING',
        clientId: null,
      });
      this.items.clear();
      this.addItem();
    } else {

      this.ordenForm.patchValue({
        id: value.id,
        priceTotal: value.priceTotal,
        statusOrder: value.statusOrder,
        clientId: value.client.id || null,
      });

      this.items.clear();

      if (value.items && value.items.length > 0) {
        value.items.forEach((item) => this.addItem(item));
      } else {
        this.addItem();
      }
    }
  }
  statusOptions = [
    'PENDING',
    'IN_PREPARATION',
    'COMPLETED',
    'CANCELLED',
    'DELIVERED',
  ];
  public ordenForm = this.formBuilder.group({
    id: [null],
    priceTotal: [0],
    statusOrder: ['PENDING'],
    clientId: [0, [Validators.required]],
    items: this.formBuilder.array([]),
  });

  get items() {
    return this.ordenForm.get('items') as FormArray;
  }
  addItem(item?: any): void {
    const newItem = this.formBuilder.group({
      id: [item?.id || this.items.length + 1],
      name: [item?.name || "" , Validators.required],
      price: [item?.price || 0, Validators.required],
      quantity: [item?.quantity || 1, Validators.required],
      restaurantId: [item?.restaurantId || 1, Validators.required],
      menuId: [item?.menuId || 1, Validators.required],
      ordenId: [item?.ordenId || 0],
    });
    this.items.push(newItem);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }
  submit(): void {
    if (!this.ordenForm.valid) return;
    const formValue = this.ordenForm.getRawValue();

    const orden: ICreateOrden = {
      ...formValue,
      items: formValue.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        restaurantId: item.restaurantId || 1,
        menuId: item.menuId || 1,
        ordenId: item.ordenId || 0,
      })),
    };
    this.onSubmit.emit(orden);
  }
}
