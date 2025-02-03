import { NgFor } from '@angular/common';
import { Component, input, output, viewChild } from '@angular/core';
import { ICustomer } from '../../../../domain/models/customer.model';
import { CustomerFormComponent } from '../../forms/customer-form/customer-form.component';
import { ModalComponent } from '../../../../../../shared/src/public-api';

@Component({
  selector: 'lib-list-customers',
  imports: [ModalComponent, CustomerFormComponent, NgFor],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.scss',
})
export class ListCustomersComponent {
  public modal = viewChild<ModalComponent>('modal');
  public deleteModal = viewChild<ModalComponent>('deleteModal');
  public customers = input.required<ICustomer[]>();
  public currentCustomer = input<ICustomer>();
  public customerToDelete: ICustomer | null = null;

  public onCreateCustomer = output<{
    customer: ICustomer;
    modal: ModalComponent;
  }>();
  public onSelectCustomer = output<number>();
  public onDeleteCustomer = output<{
    customerId: number;
    modal: ModalComponent;
  }>();

  handleSubmit(customer: ICustomer) {
    this.onCreateCustomer.emit({ customer, modal: this.modal() });
  }

  selectCustomer(id: number) {
    this.onSelectCustomer.emit(id);
    this.modal().toggle();
  }

  handleDeleteClick(customer: ICustomer) {
    this.customerToDelete = customer;
    this.deleteModal().toggle();
  }

  handleConfirmDelete() {
    if (this.customerToDelete) {
      this.onDeleteCustomer.emit({
        customerId: this.customerToDelete.customerId,
        modal: this.deleteModal(),
      });
      this.customerToDelete = null;
    }
  }

  handleCancelDelete() {
    this.deleteModal().toggle();
    this.customerToDelete = null;
  }
}
