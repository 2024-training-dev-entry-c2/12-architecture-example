import { inject, Injectable } from "@angular/core";
import { IOrder } from "../domain/model/order.model";
import { Subscription, Observable, tap, delay, finalize } from "rxjs";
import { State } from "../domain/state";
import { CreateOrderService } from "../infrastructure/services/create-order.service";

@Injectable({
    providedIn: 'root'
})
export class CreateOrderUseCase {
    private readonly _service = inject(CreateOrderService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Public Methods
    message$(): Observable<string> {
        return this._state.orders.message.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(order: IOrder) {
        this.subscriptions.add(
            this._service.execute(order).pipe(
                tap(result => {
                    this._state.orders.message.set('Orden creada con éxito');
                    const currentOrder = this._state.orders.showOrders.snapshot();
                    this._state.orders.showOrders.set([...currentOrder, result]);
                }),
                delay(2000),
                finalize(() => {
                    this._state.orders.open.set(false);
                    this._state.orders.message.set('');
                })
            ).subscribe()
        );
    }
    //#endregion
}