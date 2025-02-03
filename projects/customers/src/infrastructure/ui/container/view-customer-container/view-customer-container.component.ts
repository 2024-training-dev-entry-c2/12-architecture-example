import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ViewCustomerComponent } from "../../components/view-customer/view-customer.component";
import { FindAllCustomersCase } from '../../../../application/find-all-customers.usercase';
import { Observable } from 'rxjs';
import { ICustomer } from '../../../../domain/model/customer.model';
import { CommonModule } from '@angular/common';
import { DeleteCustomerUseCase } from '../../../../application/delete-customer.usercase';

@Component({
  selector: 'lib-view-customer-container',
  imports: [CommonModule, ViewCustomerComponent],
  templateUrl: './view-customer-container.component.html',

})
export class ViewCustomerContainerComponent implements OnInit, OnDestroy{
  private readonly _findAllCustomersUseCase = inject(FindAllCustomersCase);
  private readonly _deleteCustomerUseCase = inject(DeleteCustomerUseCase);
  customers$: Observable<ICustomer[]>;
  headers: string[] = ['id', 'nombre', 'correo', 'tipo de cliente', 'telefono'];

  ngOnInit(): void {
    this._findAllCustomersUseCase.initSubscriptions();
    this._findAllCustomersUseCase.execute();
    this.customers$ = this._findAllCustomersUseCase.customers$();
    this._deleteCustomerUseCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._findAllCustomersUseCase.destroySubscriptions();
    this._deleteCustomerUseCase.destroySubscriptions();
  }

  handleDelete(customer: ICustomer) {
    this._deleteCustomerUseCase.execute(customer);
  }
}
