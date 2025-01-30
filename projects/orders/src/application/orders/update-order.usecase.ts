import { Observable, Subscription, tap } from "rxjs";
import { IOrderRequest } from "../../domain/model/order-request";
import { inject, Injectable } from "@angular/core";
import { UpdateOrderService } from "../../infrastructure/services/update-order.service";
import { State } from "../../domain/state";
import { IOrder } from "../../domain/model/order.model";

@Injectable({
    providedIn : 'root'
})
export class DeleteOrderUsecase {
    private readonly _service = inject(UpdateOrderService);
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

    execute(id: number, order: IOrderRequest): void{
        this.subscriptions.add(
            this._service.execute(id.toString(), order).pipe(
                tap(result =>{
                    const orders = this._state.orders.orders.snapshot()
                    .map( order => order.id == id ? result : order );
                    this._state.orders.orders.set(orders);
                })
            ).subscribe()
        );
    }
    //#endregion
}