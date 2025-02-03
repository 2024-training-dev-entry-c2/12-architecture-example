import { Injectable, inject } from '@angular/core';
import { OrdersState } from './orders.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _orders = inject(OrdersState);

  get ordersState() {
    return this._orders.store();
  }
}
