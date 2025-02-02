import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDish } from '../../../../domain/model/dish.model';

@Component({
  selector: 'lib-dish-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss',
})
export class DishFormComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<IDish>();

  @Input()
  set dish(value: IDish) {
    this.form.patchValue(value);
  }

  public form = this._fb.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    menuId: [0, [Validators.required]],
    id: [null as number | null],
  });

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}
