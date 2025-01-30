import { inject, Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import { IOrder } from "../model/order.model";
import { StateFactory } from "./state.factory";


@Injectable({
  providedIn: 'root'
})
export class OrderState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly order$ = new BehaviorSubject<IOrder>(null);
  private readonly orders$ = new BehaviorSubject<IOrder[]>(null);
;
  //#endregion

  store() {
    return {
      order: this._factory.state(this.order$),
      orders:this._factory.state(this.orders$)

    }
  }
}