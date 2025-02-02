import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CapitalizeFirstPipe, IControls, InputComponent, IOptions, SelectComponent } from 'shared';
import { IDish } from '../../../../domain/model/dish.model';
import { IMenu } from '../../../../domain/model/menu.model';

@Component({
  selector: 'lib-dish-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, SelectComponent],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent implements OnInit {
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private formBuilder = inject(FormBuilder);
  public message = input<string>();
  public open$ = input<Observable<boolean>>();
  public menus$ = input<Observable<IMenu[]>>();
  public onSubmit = output<IDish>();
  public menuOptions: IOptions[] = [];

  @Input()
  set dish(value: IDish) {
    this.form.patchValue(value);
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

  ngOnInit(): void {
    this.menus$().subscribe(menus => {
      this.menuOptions = (menus ?? []).map(menu => ({
        value: menu.id,
        name: this.capitalizeFirstPipe.transform(menu.name)
      }));
      this.updateMenuOptions();
    });

    this.open$().subscribe(result => {
      if (!result) {
        this.form.reset();
      }
    });
  }

  public submit(): void {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }

  private updateMenuOptions(): void {
    const menuControl = this.controls.find(control => control.controlName === 'menuId');
    if (menuControl) {
      menuControl.options = this.menuOptions;
    }
  }
}