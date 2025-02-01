import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { BehaviorSubject } from 'rxjs';
import { ICustomer, ICustomerResponse } from '../model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly customerResponse$ = new BehaviorSubject<ICustomerResponse[]>(
    []
  );
  private readonly customer$ = new BehaviorSubject<ICustomerResponse>(null);
  //#endregion

  store() {
    return {
      customerResponse: this._factory.state(this.customerResponse$),
      customer: this._factory.state(this.customer$),
    };
  }
}
