import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IOrder } from "../model/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly order$ = new BehaviorSubject<IOrder[]>([]);
  private readonly oneOrder$ = new BehaviorSubject<IOrder>(null);
  //#endregion

  store() {
    return {
      order: this._factory.state(this.order$),
      oneOrder$: this._factory.state(this.oneOrder$)
    }
  }
}