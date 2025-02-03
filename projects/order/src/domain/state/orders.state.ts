import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IOrder, IOrderItem } from "../model/orders.model";

@Injectable({
    providedIn: 'root'
})
export class OrdersState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly order$ =  new BehaviorSubject<IOrder[]>([]);
    private readonly orderItem$ =  new BehaviorSubject<IOrderItem[]>([]);
    //#endregion

    store() {
        return {
            order: this._factory.state(this.order$),
            orderItem: this._factory.state(this.orderItem$)
        }
    }
}