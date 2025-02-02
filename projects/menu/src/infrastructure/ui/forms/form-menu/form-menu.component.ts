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
  public dishes = input<Idish[]>([]);
  @Input()
  set menus(value: any) {
    this.form.patchValue(value);
  }

  public form = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    dishIds: [[], Validators.required],
    id: [null],
    restaurantId: [null],
  });
  submit() {
    if (!this.form.valid) return;
    const formData = {
      id: this.form.get('id').value,
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      dishIds: this.form.get('dishIds').value,
      restaurantId: 5,
    };
    this.onSubmit.emit(formData);
    this.form.reset();
  }
}
