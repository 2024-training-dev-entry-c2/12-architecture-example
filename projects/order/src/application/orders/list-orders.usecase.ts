import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { ListOrdersService } from "../../infrastructure/services/list-orders.service";
import { IOrder } from "../../domain/model/orders.model";

@Injectable({
    providedIn: 'root'
})
export class ListOrdersUseCase {
    private readonly _service = inject(ListOrdersService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
    order$(): Observable<IOrder[]> {
        return this._state.orders.order.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    loadOrders(): void {
        this.subscriptions.add(
            this._service.getOrders().pipe(
                tap(result => {
                    this._state.orders.order.set(result);
                })
            ).subscribe()
        );
    }
    
    //#endregion

    //#region Private Methods
    //#endregion
}