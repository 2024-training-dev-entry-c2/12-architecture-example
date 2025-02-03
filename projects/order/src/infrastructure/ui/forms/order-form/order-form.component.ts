import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent, SelectOption } from 'shared';
import { IOrderForm } from '../../../../domain/models/order.model';

@Component({
  selector: 'lib-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  private readonly _fb = inject(FormBuilder);

  public customerOptions = input.required<SelectOption<number>[]>();
  public dishOptions = input.required<SelectOption<number>[]>();
  public onSubmit = output<IOrderForm>();

  public form = this._fb.group({
    customerId: [null as number | null, [Validators.required]],
    dishIds: [[] as number[], [Validators.required]],
    date: [new Date().toISOString()],
  });

  onCustomerSelected(customerId: number) {
    this.form.patchValue({ customerId });
  }

  onDishesSelected(dishId: number) {
    const currentDishes = this.form.get('dishIds')?.value || [];
    this.form.patchValue({
      dishIds: [...currentDishes, dishId],
    });
  }

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}
