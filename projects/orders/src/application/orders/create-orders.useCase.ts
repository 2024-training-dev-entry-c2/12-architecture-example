import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Subscription, tap } from "rxjs";
import { ModalComponent } from "shared";
import { CreateOrdersService } from "../../infrastructure/services/create-orders.service";
import { IOrder } from "../../domain/models/orders.model";

@Injectable({
    providedIn: 'root'
})
export class CreateOrderUseCase {
    private readonly _service = inject(CreateOrdersService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(order: IOrder, modal: ModalComponent): void {
        this.subscriptions.add(
            this._service.createOrder(order).
            pipe(
                tap((order) => {
                    const orders = this._state.orders.order.snapshot();
                    this._state.orders.order.set([...orders, order]);
                    modal.toggle();
                }),
            ).subscribe()
        );
    }
}