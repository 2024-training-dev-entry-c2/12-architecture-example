import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrder } from '../../../../domain/models/orders.model';

@Component({
  selector: 'lib-orders-form',
  imports: [ReactiveFormsModule],
  templateUrl: './orders-form.component.html',
  styleUrl: './orders-form.component.scss',
})
export class OrdersFormComponent {
  private readonly _fb = inject(FormBuilder);

  public onSubmit = output<IOrder>();

  @Input()
  set order(order: IOrder) {
      this.form.patchValue(order);
  }

  public form = this._fb.group<{
    id: FormControl<string | null>;
    clientId: FormControl<number | null>;
    dishIds: FormControl<number[] | null>;
    date: FormControl<string | null>;
    totalCost: FormControl<number | null>;
  }>({
    id: this._fb.control<string | null>(null),
    clientId: this._fb.control<number | null>(0, Validators.required),
    dishIds: this._fb.control<number[] | null>([], Validators.required),
    date: this._fb.control<string | null>('', Validators.required),
    totalCost: this._fb.control<number | null>(0, Validators.required),
  });

  submit() {
    if (!this.form.valid) return;

    const formValue = this.form.getRawValue() as IOrder;
    formValue.totalCost = Number(formValue.totalCost);
    this.onSubmit.emit(formValue);
  }
}
