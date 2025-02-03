import { inject, Injectable } from "@angular/core";
import { OrdersState } from "./orders.state";

//Centraliza todo el estado
@Injectable({
    providedIn: 'root'
})
export class State {
    private readonly _orders = inject(OrdersState);

    get orders(){
        return this._orders.store();
    }
}