import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrderForm } from '../../../../domain/models/order.model';
import {
  SelectComponent,
  SelectOption,
} from '../../../../../../shared/src/public-api';

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
    dishesIds: [[] as number[], [Validators.required]],
  });

  get formErrors() {
    return {
      customerId: {
        required: this.form.get('customerId')?.errors?.['required'],
      },
      dishesIds: {
        required: this.form.get('dishesIds')?.errors?.['required'],
      },
    };
  }
  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }

  onCustomerSelected(customerId: number) {
    this.form.patchValue({ customerId });
  }

  onDishesSelected(dishId: number) {
    const currentDishes = this.form.get('dishesIds')?.value || [];
    this.form.patchValue({
      dishesIds: [...currentDishes, dishId],
    });
  }
}
