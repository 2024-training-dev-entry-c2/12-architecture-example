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
import { UpdateCustomerUsecase } from '../../../../application/customers/update-customer.usecase';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-list-customers-container',
  imports: [CustomersComponent, AsyncPipe],
  templateUrl: './list-customers-container.component.html',
})
export class ListCustomersContainerComponent implements OnInit, OnDestroy {
  private readonly _listUseCase = inject(ListCustomersUsecase);
  private readonly _createUseCase = inject(CreateCustomerUsecase);
  private readonly _updateUseCase = inject(UpdateCustomerUsecase);
  private readonly _deleteUseCase = inject(DeleteCustomerUsecase);
  public customers$: Observable<ICustomerResponse[]>;
  public currentCustomer$: Observable<ICustomerResponse>;
  public currentCustomer: ICustomerResponse;

  ngOnInit(): void {
    this._listUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._listUseCase.execute();
    this.customers$ = this._listUseCase.customerResponse$();
    this.currentCustomer$ = this._updateUseCase.currentCustomer$();
    this.currentCustomer = this._updateUseCase.snapshotCurrentCustomer();
  }

  createCustomer(customer: ICustomer): void {
    const currentCustomer = this._updateUseCase.snapshotCurrentCustomer();
    if (!currentCustomer?.id) {
      this._createUseCase.execute(customer);
    } else {
      this._updateUseCase.execute(currentCustomer.id, customer);
    }
  }

  deleteCustomer(idCustomer: number): void {
    this._deleteUseCase.execute(idCustomer);
  }

  handleSelectCustomer(idCustomer: number): void {
    this._updateUseCase.selectCustomer(idCustomer);
  }

  ngOnDestroy(): void {
    this._listUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }
}
