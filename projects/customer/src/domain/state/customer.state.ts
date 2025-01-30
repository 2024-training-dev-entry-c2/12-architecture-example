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
  //private readonly customer$ = new BehaviorSubject<ICustomer[]>([]);
  private readonly customerResponse$ = new BehaviorSubject<ICustomerResponse[]>(
    []
  );
  //#endregion

  store() {
    return {
      //customer: this._factory.state(this.customer$),
      customerResponse: this._factory.state(this.customerResponse$),
    };
  }
}
