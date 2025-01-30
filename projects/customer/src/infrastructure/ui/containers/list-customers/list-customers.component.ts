import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListCustomersUsecase } from '../../../../application/customers/list-customers.usecase';
import { Observable } from 'rxjs';
import { ICustomerResponse } from '../../../../domain/model/customer.model';
import { CustomersComponent } from '../../components/customers/customers.component';

@Component({
  selector: 'lib-list-customers',
  imports: [CustomersComponent],
  templateUrl: './list-customers.component.html',
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  private _useCase = inject(ListCustomersUsecase);
  public customers: ICustomerResponse[];

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this._useCase.execute();
    this.customers = this._useCase.customerResponse();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
  }
}
