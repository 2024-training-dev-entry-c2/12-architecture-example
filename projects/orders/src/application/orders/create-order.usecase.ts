import { inject, Injectable } from "@angular/core";
import { CreateOrderService } from "../../infrastructure/services/create-order.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IOrder } from "../../domain/model/order.model";
import { IOrderRequest } from "../../domain/model/order-request";

@Injectable({
    providedIn : 'root'
})
export class CreateOrderUsecase {
    private readonly _service = inject(CreateOrderService);
    private readonly _state = inject(State);
    private subscriptions : Subscription;

    //#region Observables
    orders$() : Observable<IOrder[]> {
        return this._state.orders.orders.$();
    }
    //#endregion 

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(order: IOrderRequest): void{
        this.subscriptions.add(
            this._service.execute(order).pipe(
                tap(result =>{
                    const orders = this._state.orders.orders.snapshot();
                    this._state.orders.orders.set([...orders, result]);
                })
            ).subscribe()
        );
    }
    //#endregion
}