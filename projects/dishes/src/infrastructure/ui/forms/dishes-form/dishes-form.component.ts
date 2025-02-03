import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ICreateDish } from '../../../../domain/model/create-dishes';
import { IInput } from 'shared';
import { InputComponent } from "shared";

@Component({
  selector: 'lib-dishes-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './dishes-form.component.html',
  styleUrl: './dishes-form.component.scss'
})
export class DishesFormComponent {

  formBuilder = inject(FormBuilder);
  @Output() submit: EventEmitter<ICreateDish> = new EventEmitter<ICreateDish>();

  dishesForm = this.formBuilder.group({
    dish_name: [''],
    dish_price: [''],

  });
  inputs: IInput[] = [
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
        placeholder: '21',
        title: 'Precio',
        type: 'text',
      },
  ];

  onSubmit(){
    if(this.dishesForm.valid){
      const body: ICreateDish = {
        ...this.dishesForm.value as unknown as ICreateDish
      }
      this.submit.emit(body);
    }}


}

