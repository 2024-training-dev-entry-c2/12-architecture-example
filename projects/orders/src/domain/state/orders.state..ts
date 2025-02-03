import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IOrders } from "../model/orders.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersState{
  private readonly _factory = inject(StateFactory);
  private readonly orders$ = new BehaviorSubject<IOrders[]>([]);

  store(){
    return{
      orders: this._factory.state(this.orders$)
    }
  }

}
