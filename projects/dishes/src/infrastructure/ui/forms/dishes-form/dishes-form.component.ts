import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDish } from '../../../../domain/model/dishes.model';

@Component({
  selector: 'lib-dishes-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dishes-form.component.html',
  styleUrl: './dishes-form.component.scss',
})
export class DishesFormComponent {
  private readonly _fb = inject(FormBuilder);

  public onSubmit = output<IDish>();

  @Input()
  set dish(dish: IDish) {
    this.form.patchValue(dish);
  }

  public form = this._fb.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    type: [''],
    id: [null],
  });

  submit() {
    if (!this.form.valid) return;

    const formValue = this.form.getRawValue();
    formValue.price = Number(formValue.price);
    this.onSubmit.emit(formValue);
  }
}
