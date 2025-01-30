import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICustomer } from '../models/customer.model';
import { StateFactory } from './state.factory';

@Injectable({
  providedIn: 'root',
})
export class CustomersState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects

  private readonly customers$ = new BehaviorSubject<ICustomer[]>([]);

  //#endregion

  store() {
    return {
      customers: this._factory.state(this.customers$),
    };
  }
}
