import { NgFor } from '@angular/common';
import { Component, input, output, viewChild } from '@angular/core';
import { ModalComponent } from 'shared';
import {
  ICustomer
} from '../../../../domain/models/customer.model';
import { CustomerFormComponent } from '../../forms/customer-form/customer-form.component';

@Component({
  selector: 'lib-list-customers',
  imports: [ModalComponent, CustomerFormComponent, NgFor],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.scss',
})
export class ListCustomersComponent {
  public modal = viewChild<ModalComponent>('modal');
  public customers = input.required<ICustomer[]>();
  public currentCustomer = input<ICustomer>();
  public onCreateCustomer = output<{
    customer: ICustomer;
    modal: ModalComponent;
  }>();
  public onSelectCustomer = output<number>();
  component: any;

  handleSubmit(customer: ICustomer) {
    this.onCreateCustomer.emit({ customer, modal: this.modal() });
  }

  selectCustomer(id: number) {
    this.onSelectCustomer.emit(id);
    this.modal().toggle();
  }
}
