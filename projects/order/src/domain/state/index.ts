import { Injectable, inject } from '@angular/core';
import { OrdersState } from './orders.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _dishes = inject(OrdersState);

  get dishes() {
    return this._dishes.store().orders;
  }
}