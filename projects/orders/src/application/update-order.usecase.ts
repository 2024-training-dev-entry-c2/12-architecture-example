import { inject, Injectable } from "@angular/core";
import { IOrder } from "../domain/model/order.model";
import { Subscription, Observable, tap, delay, finalize } from "rxjs";
import { State } from "../domain/state";
import { UpdateOrderService } from "../infrastructure/services/update-order.service";

@Injectable({
    providedIn: 'root'
})
export class UpdateOrderUseCase {
    private readonly _service = inject(UpdateOrderService);
    private readonly _state = inject(State);
    private subscription: Subscription;

    //#region Observables
    message$(): Observable<string> {
        return this._state.orders.message.$();
    }

    currentOrder$(): Observable<IOrder> {
        return this._state.orders.currentOrder.$()
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscription = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscription.unsubscribe();
    }

    execute(order: IOrder) {
        this.subscription.add(
            this._service.execute(order.id, order)
                .pipe(
                    tap(result => {
                        this._state.orders.message.set('Orden actualizada con éxito');
                        const currentOrder = this._state.orders.showOrders.snapshot();
                        const updatedOrders = currentOrder.map(d => d.id === result.id ? result : d);
                        this._state.orders.showOrders.set(updatedOrders);
                    }),
                    delay(2000),
                    finalize(() => {
                        this._state.orders.currentOrder.set(null);
                        this._state.orders.open.set(false);
                        this._state.orders.message.set('');
                    })
                ).subscribe()
        )
    }

    selectOrder(orderId: number) {
        const currentOrder = this._state.orders.showOrders.snapshot().find(o => o.id === orderId);
        this._state.orders.currentOrder.set(currentOrder);
    }
    //#endregion
}