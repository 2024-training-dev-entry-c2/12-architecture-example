import { Component, inject, input, Input, OnDestroy, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IControls, InputComponent, IOptions, SelectComponent } from 'shared';
import { ModalUsecase } from '../../../../application/modal.usecase';
import { IDish } from '../../../../domain/model/dish.model';
import { CommonModule } from '@angular/common';
import { GetMenusUsecase } from '../../../../application/menu/get-menus.usecase';

@Component({
  selector: 'lib-dish-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, SelectComponent],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent implements OnInit, OnDestroy {
  private readonly _useCaseModal = inject(ModalUsecase);
  private readonly _useCaseMenus = inject(GetMenusUsecase);
  private formBuilder = inject(FormBuilder);
  public message = input<string>();
  public onSubmit = output<IDish>();
  public menuOptions: IOptions[] = [];

  @Input()
  set dish(value: IDish) {
    this.form.patchValue(value);
  }

  ngOnInit() {
    this._useCaseModal.initSubscriptions();
    this._useCaseMenus.initSubscriptions();
    this._useCaseMenus.execute();

    this._useCaseMenus.menus$().subscribe(menus => {
      this.menuOptions = (menus ?? []).map(menu => ({
        value: menu.id,
        name: menu.name
      }));
      this.updateMenuOptions();
    });

    this._useCaseModal.open$().subscribe(result => {
      if (!result) {
        this.form.reset();
      }
    });
  }

  ngOnDestroy() {
    this._useCaseModal.destroySubscriptions();
    this._useCaseMenus.destroySubscriptions();
  }

  public form: FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    menuId: ['', [Validators.required]]
  });

  public controls: IControls[] = [
    { type: 'input', text: 'Nombre', inputType: 'text', controlName: 'name' },
    { type: 'input', text: 'Descripcion', inputType: 'text', controlName: 'description' },
    { type: 'input', text: 'Precio', inputType: 'number', controlName: 'price' },
    {
      type: 'select', text: 'Menu', controlName: 'menuId',
      options: []
    }
  ];

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }

  private updateMenuOptions() {
    const menuControl = this.controls.find(control => control.controlName === 'menuId');
    if (menuControl) {
      menuControl.options = this.menuOptions;
    }
  }
}