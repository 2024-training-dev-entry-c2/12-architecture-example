import { inject, Injectable } from "@angular/core";
import { OrdersState } from "./order.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _order = inject(OrdersState);

  get orders() {
    return this._order.store();
  }
}