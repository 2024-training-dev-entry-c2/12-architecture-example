import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IClient } from "../model/client.model";
import { IDish } from "../model/dish.model";
import { IOrder } from "../model/order.model";

@Injectable({
    providedIn: 'root'
})
export class OrderState {
    private readonly _factory = inject(StateFactory);

    //#region Subjects
    private readonly orders$ = new BehaviorSubject<IOrder[]>([]);
    private readonly currentOrder$ = new BehaviorSubject<IOrder | null>(null);
    private readonly open$ = new BehaviorSubject<boolean>(false);
    private readonly message$ = new BehaviorSubject<string>('');
    private readonly clients$ = new BehaviorSubject<IClient[]>(null);
    private readonly client$ = new BehaviorSubject<IClient>(null);
    private readonly dishes$ = new BehaviorSubject<IDish[]>(null);
    private readonly dish$ = new BehaviorSubject<IDish>(null);
    //#endregion

    store() {
        return {
            clients: this._factory.state(this.clients$),
            client: this._factory.state(this.client$),
            dishes: this._factory.state(this.dishes$),
            dish: this._factory.state(this.dish$),
            showOrders: this._factory.state(this.orders$),
            currentOrder: this._factory.state(this.currentOrder$),
            showDishes: this._factory.state(this.dishes$),
            currentDish: this._factory.state(this.dish$),
            showClients: this._factory.state(this.clients$),
            currentClient: this._factory.state(this.client$),
            open: this._factory.state(this.open$),
            message: this._factory.state(this.message$)
        }
    }

}