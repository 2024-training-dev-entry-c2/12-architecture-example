import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { CreateItemService } from "../../infrastructure/services/create-item.service";
import { IOrderItem } from "../../domain/model/orders.model";

@Injectable({
    providedIn: 'root'
})
export class CreateOrderItemUseCase {
    private readonly _service = inject(CreateItemService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
    orderItems$(): Observable<IOrderItem[]> {
        return this._state.orders.orderItem.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    addOrderItem(orderId: number, orderItem: IOrderItem): void {
        this.subscriptions.add(
            this._service.addOrderItem(orderId, orderItem)
                .pipe(
                    tap(result => {
                        console.log('Order item created:', result);
                        const orderItems = this._state.orders.orderItem.snapshot();
                        this._state.orders.orderItem.set([...orderItems, result]);
                    })
                )
                .subscribe()
        );
    }
    //#endregion

    //#region Private Methods
    //#endregion
}
