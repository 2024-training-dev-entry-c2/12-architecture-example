import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IClient, IOrder } from "../model/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly orders$ = new BehaviorSubject<IOrder[]>([]);
  private readonly currentOrder$ = new BehaviorSubject<IOrder>(null);
  // private readonly clients$ = new BehaviorSubject<IClient[]>([]);
  // private readonly dishes$ = new BehaviorSubject<IClient[]>([]);
  //#endregion

  store() {
    return {
      allOrders: this._factory.state(this.orders$),
      currentOrder: this._factory.state(this.currentOrder$)
    }
  }
}