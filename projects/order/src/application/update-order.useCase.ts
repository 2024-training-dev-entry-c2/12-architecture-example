import { inject, Injectable } from "@angular/core";
import { tap, Subscription, Observable, switchMap, of } from "rxjs";
import { IOrder } from "../domain/model/order.model";
import { State } from "../domain/state";
import { UpdateOrderService } from "../infrastructure/services/update-order.service";

@Injectable({
    providedIn: 'root'
})

export class UpdateOrderUseCase {
    private readonly _service = inject(UpdateOrderService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number, updatedOrder: Partial<IOrder>): Observable<void> {
        return this._service.update(id, updatedOrder).pipe(
            tap(updatedOrder => {
                console.log(`Orden actualizada: ${updatedOrder}`);

                const currentOrders = this._state.orders.order.snapshot();

                const updatedOrders = currentOrders.map(order =>
                    order.id === id ? { ...order, ...updatedOrder } : order
                );

                this._state.orders.order.set(updatedOrders);
            }),
            switchMap(() => of(void 0)) 
        );
    }
}
