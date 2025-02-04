import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Subscription, tap } from "rxjs";
import { DeleteOrderService } from "../infrastructure/services/delete-order.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteOrderUseCase {
    private readonly _service = inject(DeleteOrderService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(orderId: number) {
        this.subscriptions.add(
            this._service.execute(orderId).pipe(
                tap(result => {
                    const currentOrders = this._state.orders.showOrders.snapshot();
                    this._state.orders.showOrders.set(currentOrders.filter(o => o.id !== orderId));
                })
            ).subscribe()
        );
    }
    //#endregion
}