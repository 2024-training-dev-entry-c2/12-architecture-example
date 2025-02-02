import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { DeleteOrderService } from "../infrastructure/services/delete-order.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteOrderUseCase {
    private readonly _service = inject(DeleteOrderService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number): void {
        this.subscriptions.add(
            this._service.delete(id)
                .pipe(
                    tap(response => {
                        console.log(`Order eliminado: ${response}`);

                        const currentOrders = this._state.orders.order.snapshot();

                        const updatedOrders = currentOrders.filter(order => order.id !== id);

                        this._state.orders.order.set(updatedOrders);
                    })
                )
                .subscribe()
        );
    }
}
