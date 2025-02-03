import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { ModalComponent } from "shared";
import { UpdateOrdersService } from "../../infrastructure/services/update-orders.service";
import { IOrder } from "../../domain/models/orders.model";

@Injectable({
    providedIn: 'root'
})
export class UpdateOrdersUseCase {
    private readonly _service = inject(UpdateOrdersService);
    private readonly _state = inject(State);
    private subscription: Subscription;

    currentOrder$(): Observable<IOrder> {
        return this._state.orders.currentOrder.$();
    }

    initSubscriptions(): void {
        this.subscription = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscription.unsubscribe();
    }

    execute(dish: IOrder, modal: ModalComponent): void {
        this.subscription.add(
            this._service.updateOrder(dish)
            .pipe(
                tap((updateOrder) => {
                    const orders = this._state.orders.order.snapshot();
                    const neworders = orders.map(d => d.id === updateOrder.id ? updateOrder : d);
                    this._state.orders.order.set(neworders);
                    modal.toggle();
                    this._state.orders.currentOrder.set(null);
                })
            ).subscribe()
        );
    }

    selectOrder(id: string): void {
        const currentOrder = this._state.orders.order.snapshot().find(order => order.id === id);
        this._state.orders.currentOrder.set(currentOrder);
    }
}