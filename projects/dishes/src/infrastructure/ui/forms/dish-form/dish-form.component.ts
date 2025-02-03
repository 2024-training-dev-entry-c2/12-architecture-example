import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menu.model';
import { IDish } from '../../../../domain/model/dish.model';
import { IControls, InputComponent, IOptions, SelectComponent } from 'shared';

@Component({
  selector: 'lib-dish-form',
  imports: [ReactiveFormsModule, CommonModule, SelectComponent, InputComponent],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent implements OnInit {
  private _fb = inject(FormBuilder);
  public message = input<string>();
  public isOpen$ = input<Observable<boolean>>();
  public menus$ = input<Observable<IMenu[]>>();
  public onSubmit = output<IDish>();
  public menuOptions: IOptions[] = [];

  @Input()
  set dish(value: IDish | null) {
    if (value) {
      this.form.patchValue(value);
    } else {
      this.form.reset();
    }
  }

  public form: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    menuId: ['', [Validators.required]],
    id: [null]
  });

  public controls: IControls[] = [
    { text: 'Nombre', type: 'input', inputType: "text", controlName: 'name', placeholder: 'Pizzas' },
    { text: 'Descripcion', type: 'input', inputType: "text", controlName: 'description', placeholder: 'Pizzas de diferentes sabores' },
    { text: 'Precio', type: 'input', inputType: "number", controlName: 'price', placeholder: '1000' },
    { text: 'Menu', type: 'select', inputType: "text", controlName: 'menuId', placeholder: 'Pizza', options: [] },
  ];
  
  ngOnInit(): void {
    this.menus$().subscribe(menus => {
      this.menuOptions = (menus ?? []).map(menu => ({
        name: menu.name,
        value: menu.id,
      }));
      this.updateMenuOptions();
    });

    this.isOpen$().subscribe(result => {
      if (!result) {
        this.form.reset();
      }
    });
  }

  public submit(): void {
    if (this.form.invalid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }

  private updateMenuOptions(): void {
    const menuControl = this.controls.find(control => control.controlName === 'menuId');
    if (menuControl) {
      menuControl.options = this.menuOptions;
    }
  }


}