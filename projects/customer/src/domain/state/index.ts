import { inject, Injectable } from '@angular/core';
import { CustomersState } from './customers.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _customers = inject(CustomersState);

  get users() {
    return this._customers.store();
  }
}
