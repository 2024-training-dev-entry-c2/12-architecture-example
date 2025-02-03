import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from 'shared';
import { IOrder } from "../model/order.model";

@Injectable({
    providedIn: 'root'
})
export class OrdersState {
    private readonly _factory = inject(StateFactory);
    
    //#region Subjects
    private readonly orders$ = new BehaviorSubject<IOrder[]>(null);
    private readonly currentOrder$ = new BehaviorSubject<IOrder>(null);
    //#endregion

    store(){
        return {
            orders: this._factory.state(this.orders$),
            currentOrder: this._factory.state(this.currentOrder$)
        };
    }
}