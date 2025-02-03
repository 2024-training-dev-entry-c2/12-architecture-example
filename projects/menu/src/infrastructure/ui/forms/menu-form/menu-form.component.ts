import { Component, EventEmitter, inject, Output } from '@angular/core';
import { InputComponent } from "shared";
import { IInput } from 'shared';
import { ICreateMenu } from '../../../../domain/model/create.menu.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-menu-form',
  imports: [CommonModule, ReactiveFormsModule,InputComponent],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent {

  formBuilder = inject(FormBuilder);
  router = inject(Router);

  @Output() onSubmitMenu = new EventEmitter<ICreateMenu>();

  menuForm = this.formBuilder.group({
    menu_name: [''],
    menu_schedule: [''],
    menu_dishes: this.formBuilder.group({
      dish_name: [''],
      dish_price: ['']
    })
  });

  onSubmit() {
    if (this.menuForm.valid) {
      const body: ICreateMenu = {
        menu_name: this.menuForm.value.menu_name as unknown as string,
        menu_schedule: this.menuForm.value.menu_schedule as unknown as string,
        menu_dishes: [{
          dish_name: this.menuForm.value.menu_dishes!.dish_name as unknown as string,
          dish_price: this.menuForm.value.menu_dishes!.dish_price as unknown as string
        }]
      }
      this.onSubmitMenu.emit(body);
    }

  }
  inputs: IInput[] = [
        {
          aria: 'menu_name',
          control: 'menu_name',
          name: 'menu_name',
          placeholder: 'Fiesta pizza',
          title: 'Nombre',
          type: 'text',
        },
        {
          aria: 'menu_schedule',
          control: 'menu_schedule',
          name: 'menu_schedule',
          placeholder: 'Lunes, Miercoles',
          title: 'Programacion',
          type: 'text',
        },
    ];
  dishes: IInput[] = [
        {
          aria: 'dish_name',
          control: 'dish_name',
          name: 'dish_name',
          placeholder: 'Pizza doble queso',
          title: 'Nombre',
          type: 'text',
        },
        {
          aria: 'dish_price',
          control: 'dish_price',
          name: 'dish_price',
          placeholder: '$ 56',
          title: 'Precio',
          type: 'text',
        },
    ];

  }
