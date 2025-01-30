import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListCustomersUsecase } from '../../../../application/customers/list-customers.usecase';
import { ICustomerResponse } from '../../../../domain/model/customer.model';
import { CustomersComponent } from '../../components/customers/customers.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-list-customers',
  imports: [CustomersComponent],
  templateUrl: './list-customers.component.html',
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  private _listUseCase = inject(ListCustomersUsecase);
  public customers$: Observable<ICustomerResponse[]>;

  ngOnInit(): void {
    this._listUseCase.initSubscriptions();
    this._listUseCase.execute();
    this.customers$ = this._listUseCase.customerResponse$();
  }

  ngOnDestroy(): void {
    this._listUseCase.destroySubscriptions();
  }
}
