import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IInput, InputComponent } from 'shared';
import { ICreateMenu } from '../../../../domain/model/create.menu.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-update-menu-form',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './update-menu-form.component.html',
  styleUrl: './update-menu-form.component.scss'
})
export class UpdateMenuFormComponent {
  formBuilder = inject(FormBuilder);

  @Output() onSubmitMenu = new EventEmitter<ICreateMenu>();

  updateMenuForm = this.formBuilder.group({
    menu_name: [''],
    menu_schedule: [''],
  });

  onSubmit(){

    if(this.updateMenuForm.valid){
      const body: ICreateMenu = {
        ...this.updateMenuForm.value as unknown as ICreateMenu
      }
      this.onSubmitMenu.emit(body);
    }
  }


    inputs: IInput[] = [
      {
        aria: 'menu_name',
        control: 'menu_name',
        name: 'menu_name',
        placeholder: 'Festa pizza',
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


}
