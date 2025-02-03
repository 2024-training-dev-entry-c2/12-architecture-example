import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent, SelectOption } from 'shared';
import { IMenu, IMenuFormDto } from '../../../../domain/models/menu.model';

@Component({
  selector: 'lib-menu-form',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent],
  templateUrl: './menu-form.component.html',
})
export class MenuFormComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<IMenuFormDto>();
  public initialMenu = input<IMenu>();
  public dishOptions = input<SelectOption<number>[]>();

  public form = this._fb.group({
    menuId: [null as number | null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    dishIds: [[] as number[], [Validators.required, Validators.minLength(1)]],
  });

  ngOnInit() {
    if (this.initialMenu()) {
      this.form.patchValue({
        ...this.initialMenu(),
        dishIds: this.initialMenu()?.dishes.map((d) => d.id) || [],
      });
    }
  }

  addDishId(dishId: number) {
    const currentIds = this.form.get('dishIds')?.value || [];
    if (!currentIds.includes(dishId)) {
      this.form.patchValue({
        dishIds: [...currentIds, dishId],
      });
    }
  }

  removeDishId(dishId: number) {
    const currentIds = this.form.get('dishIds')?.value || [];
    this.form.patchValue({
      dishIds: currentIds.filter((id) => id !== dishId),
    });
  }

  getDishLabel(dishId: number): string {
    return (
      this.dishOptions()?.find((opt) => opt.value === dishId)?.label ||
      `Plato ${dishId}`
    );
  }

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
      dishIds: {
        required: this.form.get('dishIds')?.errors?.['required'],
        minlength: this.form.get('dishIds')?.errors?.['minlength'],
      },
    };
  }
}
