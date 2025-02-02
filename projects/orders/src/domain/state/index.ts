import { inject, Injectable } from '@angular/core';
import { StateOrders } from './orders.state';

@Injectable({ providedIn: 'root' })
export class StateIndexOrders {
  private readonly _state = inject(StateOrders);

  get ordersStates() {
    return this._state.store();
  }
}
