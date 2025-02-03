import {  Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IInput, InputComponent } from 'shared';
import { ICreateCustomer } from '../../../../domain/model/create.customer.model';

@Component({
  selector: 'lib-customer-form',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
  formBuilder = inject(FormBuilder);
  
  @Output() submit: EventEmitter<ICreateCustomer> = new EventEmitter<ICreateCustomer>();

  customerForm = this.formBuilder.group({
    customer_name: ['',[ Validators.minLength(3)]],
    customer_email: ['',[ Validators.email]],
    customer_age: ['',[Validators.min(2)]],
    customer_phone: [''],
    customer_address: ['']

  });

  inputs: IInput[] = [
    {
      aria: 'customer_name',
      control: 'customer_name',
      name: 'customer_name',
      placeholder: 'Pedro Perez',
      title: 'Nombre',
      type: 'text',
    },
    {
      aria: 'customer_email',
      control: 'customer_email',
      name: 'customer_email',
      placeholder: 'pedroperez@correo.com',
      title: 'Correo',
      type: 'email',
    },
    {
      aria: 'customer_age',
      control: 'customer_age',
      name: 'customer_age',
      placeholder: '30',
      title: 'Edad',
      type: 'number',
    },
    {
      aria: 'customer_phone',
      control: 'customer_phone',
      name: 'customer_phone',
      placeholder: 'xxx-xxx-xxxx',
      title: 'Telefono',
      type: 'text',
    },
    {
      aria: 'customer_address',
      control: 'customer_address',
      name: 'customer_address',
      placeholder: 'Av. La Paz ',
      title: 'Direccion',
      type: 'text',
    }
  ];

  onSubmit(): void {
    if (this.customerForm.valid) {
      const body: ICreateCustomer = {
        ...this.customerForm.value as unknown as ICreateCustomer
      }
      this.submit.emit(body);
    }
  }


}
