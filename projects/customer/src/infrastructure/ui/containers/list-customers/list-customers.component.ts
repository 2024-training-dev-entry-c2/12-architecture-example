import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListCustomersUsecase } from '../../../../application/customers/list-customers.usecase';
import { ICustomerResponse } from '../../../../domain/model/customer.model';
import { CustomersComponent } from '../../components/customers/customers.component';
import { Observable } from 'rxjs';
import { DeleteCustomerUsecase } from '../../../../application/customers/delete-customer.usecase';

@Component({
  selector: 'lib-list-customers',
  imports: [CustomersComponent],
  templateUrl: './list-customers.component.html',
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  private readonly _listUseCase = inject(ListCustomersUsecase);
  private readonly _deleteUseCase = inject(DeleteCustomerUsecase);
  public customers$: Observable<ICustomerResponse[]>;

  ngOnInit(): void {
    this._listUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._listUseCase.execute();
    this.customers$ = this._listUseCase.customerResponse$();
  }

  deleteCustomer(idCustomer: number): void {
    this._deleteUseCase.execute(idCustomer);
  }

  ngOnDestroy(): void {
    this._listUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }
}
