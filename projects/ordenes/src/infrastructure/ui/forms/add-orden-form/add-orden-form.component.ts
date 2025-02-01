import { Component, inject, input, Input, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICreateOrden } from '../../../../domain/model/create-orden.model';

@Component({
  selector: 'lib-add-orden-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-orden-form.component.html',
  styleUrl: './add-orden-form.component.scss'
})
export class AddOrdenFormComponent {
private readonly formBuilder = inject(FormBuilder);
  public onSubmit = output<ICreateOrden>();
  public statusChange= output<{ idOrden: number, statusOrder: string }>();

  @Input()
  set Orden(value: ICreateOrden) {
    if (value && value.id) {
      this.ordenForm.patchValue(value);
    } else {
      this.ordenForm.reset({
        priceTotal: null,
        statusOrder: '',
        clientId: null,
        items: null,
      });
    }
  }
statusOptions = ['PENDING', 'IN_PREPARATION', 'COMPLETED', 'CANCELLED', 'DELIVERED'];
  public ordenForm = this.formBuilder.group({
    id: [null],
    priceTotal: [0],
    statusOrder: ['PENDING'],
    clientId: [0, [Validators.required]],
    items: this.formBuilder.array([])
  });

  get items() {
    return this.ordenForm.get('items') as FormArray;
  }
  addItem(): void {
    const newItem = this.formBuilder.group({
      id: [this.items.length + 1],
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [1, Validators.required],
      restaurantId: [0, Validators.required],
      menuId: [0, Validators.required],
      ordenId: [0]
    });
    this.items.push(newItem);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }
  submit(): void {
    if (!this.ordenForm.valid) return
   // this.onSubmit.emit(this.ordenForm.getRawValue());
  }
}
