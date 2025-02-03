import { inject, Injectable } from "@angular/core";
import {  OrderState } from "./order.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _orders = inject(OrderState);

  get orders() {
    return this._orders.store();
  }
}