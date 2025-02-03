import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Subscription, tap } from "rxjs";
import { DeleteOrdersService } from "../../infrastructure/services/delete-orders.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteOrderUseCase{
    private readonly _service = inject(DeleteOrdersService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: string): void {
        if (!id) {
            console.error('No se proporcionó un ID válido para eliminar el plato.');
            return;
        }

        this.subscriptions.add(
            this._service.deleteOrder(id)
            .pipe(
                tap(() => {
                    setTimeout(() => {
                        const orders = this._state.orders.order.snapshot();
                        const newOrders = orders.filter(order => order.id !== id);
                        this._state.orders.order.set(newOrders);
                    }, 500);
                })
            ).subscribe()
        );
    }
}