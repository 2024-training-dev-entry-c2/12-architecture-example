import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IOrders } from "../model/orders.model";
import { StateFactory } from "./state.factory";


@Injectable({
    providedIn: 'root'
})
export class OrdersState {
    private readonly _factory = inject(StateFactory);
    
    private readonly _orders$ = new BehaviorSubject<IOrders[]>([]); 

    store() {
        return {
            order: this._factory.state(this._orders$)
        }
    }
}