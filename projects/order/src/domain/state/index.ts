import { inject, Injectable } from "@angular/core";
import { DishState } from "./order.state";

@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _orders = inject(DishState);

  get orders() {
    return this._orders.store();
  }
}