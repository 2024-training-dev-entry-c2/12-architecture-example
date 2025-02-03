import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from '../../../../domain/model/menus.model';

@Component({
  selector: 'lib-menus-form',
  imports: [ReactiveFormsModule],
  templateUrl: './menus-form.component.html',
  styleUrl: './menus-form.component.scss',
})
export class MenusFormComponent {
  private readonly _fb = inject(FormBuilder);

  public onSubmit = output<IMenu>();

  @Input()
  set menu(menu: IMenu) {
    this.form.patchValue(menu);
  }

  public form = this._fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    dishes: this._fb.array([]),
  });

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue() as IMenu);
  }
}
