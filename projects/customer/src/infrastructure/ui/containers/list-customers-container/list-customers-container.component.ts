import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListCustomersUsecase } from '../../../../application/customers/list-customers.usecase';
import {
  ICustomer,
  ICustomerResponse,
} from '../../../../domain/model/customer.model';
import { CustomersComponent } from '../../components/customers/customers.component';
import { Observable } from 'rxjs';
import { DeleteCustomerUsecase } from '../../../../application/customers/delete-customer.usecase';
import { CreateCustomerUsecase } from '../../../../application/customers/create-customer.usecase';

@Component({
  selector: 'lib-list-customers-container',
  imports: [CustomersComponent],
  templateUrl: './list-customers-container.component.html',
})
export class ListCustomersContainerComponent implements OnInit, OnDestroy {
  private readonly _listUseCase = inject(ListCustomersUsecase);
  private readonly _createUseCase = inject(CreateCustomerUsecase);
  private readonly _deleteUseCase = inject(DeleteCustomerUsecase);
  public customers$: Observable<ICustomerResponse[]>;

  ngOnInit(): void {
    this._listUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._listUseCase.execute();
    this.customers$ = this._listUseCase.customerResponse$();
  }

  createCustomer(customer: ICustomer): void {
    this._createUseCase.execute(customer);
  }

  deleteCustomer(idCustomer: number): void {
    this._deleteUseCase.execute(idCustomer);
  }

  ngOnDestroy(): void {
    this._listUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }
}
