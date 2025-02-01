import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Imenu } from '../../../../domain/model/menu.model';
import { Idish } from 'dish';

@Component({
  selector: 'lib-form-menu',
  imports: [ReactiveFormsModule],
  templateUrl: './form-menu.component.html',
  styleUrl: './form-menu.component.scss',
})
export class FormMenuComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<Imenu>();
  @Input() dishes: Idish[] = [];

  constructor() {
    console.log('dishes', this.dishes);
  }

  @Input()
  set menus(value: any) {
    this.form.patchValue(value);
  }
  public form = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    dishes: [[], Validators.required],
    id: [null],
    restaurantId: [null],
  });
  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
    console.log(this.form.value);
    console.log(this.dishes);
  }
}
