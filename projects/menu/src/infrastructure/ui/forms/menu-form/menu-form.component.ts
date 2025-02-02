import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from '../../../../domain/models/menu.model';
import { IDish } from '../../../../../../dish/src/domain/model/dish.model';

@Component({
  selector: 'lib-menu-form',
  imports: [ReactiveFormsModule],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss',
})
export class MenuFormComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<IMenu>();

  @Input()
  set menu(value: IMenu) {
    this.form.patchValue(value);
  }

  public form = this._fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dishes: [[] as IDish[]],
    menuId: [null as number | null],
  });

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}
