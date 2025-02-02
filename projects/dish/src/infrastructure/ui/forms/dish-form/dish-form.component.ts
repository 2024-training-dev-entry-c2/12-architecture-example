import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDish, IMenu } from '../../../../domain/model/dish.model';
import { DynamicInputComponent } from 'shared';

@Component({
  selector: 'lib-dish-form',
  imports: [ReactiveFormsModule, CommonModule, DynamicInputComponent],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent implements OnChanges {
  private _fb = inject(FormBuilder);
  public onSubmit = output<IDish>();
  public menus = input<IMenu[]>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menus'] && this.menus) {
      this.menuConfig.options = [];
      this.menus().forEach((menu) => {
        this.menuConfig.options.push({ label: menu.name, value: menu.id });
      });
  
      if (this.dishForm.value.id && this.dishForm.value.menuId) {
        const selectedMenu = this.menus().find(menu => menu.id === this.dishForm.value.menuId);
        if (selectedMenu) {
          this.dishForm.patchValue({ menuId: selectedMenu.id });
        }
      }
    }
  }

  @Input()
  set dish(value: IDish | null) {
  if (value) {
    this.dishForm.patchValue({
      ...value,
      menuId: value.menu?.id || null 
    });
  } else {
    this.dishForm.reset();
  }
}

  nameConfig = {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Escribe el nombre del plato',
    errorMessage: 'El nombre es requerido.',
  };

  descriptionConfig = {
    name: 'description',
    label: 'Descripción',
    type: 'text',
    placeholder: 'Escribe una breve descripción',
    errorMessage: 'La descripción es requerida.',
  };

  priceConfig = {
    name: 'price',
    label: 'Precio',
    type: 'number',
    placeholder: 'Escribe el precio del plato',
    errorMessage: 'El precio es requerido.',
  };

  menuConfig = {
    name: 'menuId',
    label: 'Menú',
    type: 'select',
    options: [] as { label: string; value: number }[],
    errorMessage: 'Selecciona un menú.',
  };

  public dishForm = this._fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    menuId: [null as number | null, [Validators.required]],
    id: [null]
  });

  submit() {
    if (!this.dishForm.valid) return;
    this.onSubmit.emit(this.dishForm.getRawValue() as IDish);
  }
}