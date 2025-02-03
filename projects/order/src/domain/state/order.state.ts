import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IOrder } from "../model/order.model";
import { IClient } from "../model/client.model";
import { IDish } from "../model/dish.model";

@Injectable({
  providedIn: 'root'
})
export class DishState {
  private readonly _factory = inject(StateFactory); 

  //#region Subjects
  private readonly orders$ = new BehaviorSubject<IOrder[]>([null]);
  private readonly message$ = new BehaviorSubject<string>(null);
  private readonly currentOrder$ = new BehaviorSubject<IOrder>(null);
  private readonly open$ = new BehaviorSubject<boolean>(false);
  private readonly openDetails$ = new BehaviorSubject<boolean>(false);
  private readonly listClients$ = new BehaviorSubject<IClient[]>(null);
  private readonly client$ = new BehaviorSubject<IClient>(null);
  private readonly listDishes$ = new BehaviorSubject<IDish[]>(null);
  //#endregion

  store() {
    return {
      listOrders: this._factory.state(this.orders$),
      message: this._factory.state(this.message$),
      currentOrder: this._factory.state(this.currentOrder$),
      open: this._factory.state(this.open$),
      openDetails: this._factory.state(this.openDetails$),
      listClients: this._factory.state(this.listClients$),
      client: this._factory.state(this.client$),
      listDishes: this._factory.state(this.listDishes$),
    }
  }
}