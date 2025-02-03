import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { ListOrdersService } from "../../infrastructure/services/list-orders.service";
import { IOrder } from "../../domain/models/orders.model";

@Injectable({
    providedIn: 'root'
})
export class ListsOrderUseCase {
    private readonly _service = inject(ListOrdersService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    dish$(): Observable<IOrder[]> {
        return this._state.orders.order.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(): void {
            this.subscriptions.add(
                this._service.getOrders().pipe(
                    tap(data => this._state.orders.order.set(data))
                ).subscribe()
            );
    }
}