import { Component, inject, Input, output } from '@angular/core';
import { Iorder } from '../../../../domain/model/orders.model';
import { Idish } from 'dish';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iclient } from 'clients';

@Component({
  selector: 'lib-form-orders',
  imports: [ReactiveFormsModule],
  templateUrl: './form-orders.component.html',
  styleUrl: './form-orders.component.scss',
})
export class FormOrdersComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<Iorder>();
  public orderPlantilla: any;
  @Input() dishes: Idish[] = [];
  @Input() users: Iclient[] = [];
  constructor() {
    console.log(this.dishes, "formulario dishes");

  }

  @Input()
  set orders(value: any) {
    this.form.patchValue(value);
  }
  public form = this._fb.group({
    date: ['', Validators.required],
    user: [[0], Validators.required],
    dish: [[0], Validators.required],
    quantity: [0, Validators.required],
    id: [null],
  });

  submit() {
    if (!this.form.valid) return;

    let dishIds = this.form.get('dish')?.value;
    const quantity = this.form.get('quantity')?.value;

    if (!Array.isArray(dishIds)) {
      dishIds = [dishIds];
    }

    const orderDetails = dishIds.map((dishId: number) => ({
      dish: { id: dishId },
      quantity: quantity,
    }));

    this.orderPlantilla = {
      date: this.form.get('date')?.value,
      user: {
        id: this.form.get('user')?.value,
      },
      orderDetails,
    };

    this.onSubmit.emit(this.orderPlantilla);
    this.form.reset();
  }
}
