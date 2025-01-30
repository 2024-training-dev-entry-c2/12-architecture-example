import { inject, Injectable } from '@angular/core';
import { CustomerState } from './customer.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _customers = inject(CustomerState);

  get customers() {
    return this._customers.store();
  }
}
