import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from '../../../../domain/models/menu.model';
import { IDish } from '../../../../domain/models/dish.model';

@Component({
  selector: 'lib-menu-form',
  standalone: true,
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
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    ],
    dishes: [[] as IDish[]],
    menuId: [null as number | null],
  });

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.getRawValue());
    }
  }

  get formErrors() {
    return {
      name: {
        required: this.form.get('name')?.errors?.['required'],
        minlength: this.form.get('name')?.errors?.['minlength'],
        maxlength: this.form.get('name')?.errors?.['maxlength'],
      },
      description: {
        required: this.form.get('description')?.errors?.['required'],
        minlength: this.form.get('description')?.errors?.['minlength'],
        maxlength: this.form.get('description')?.errors?.['maxlength'],
      },
    };
  }
}
