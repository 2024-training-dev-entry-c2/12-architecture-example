import { inject, Injectable } from "@angular/core";
import { IOrder } from "../domain/model/order.model";
import { Subscription, Observable, tap } from "rxjs";
import { State } from "../domain/state";
import { GetAllOrdersService } from "../infrastructure/services/get-all-orders.service";

@Injectable({
    providedIn: 'root'
})
export class GetAllOrdersUseCase {
    private readonly _service = inject(GetAllOrdersService);
    private readonly _state = inject(State);
    private subscriptions: Subscription

    //#region Observables
    order$(): Observable<IOrder[]> {
        return this._state.orders.showOrders.$() as Observable<IOrder[]>;
    }
    //#endregion

    //#region Public Methods
    initSubscriptions() {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions() {
        this.subscriptions.unsubscribe();
    }

    execute(): void {
        this.subscriptions.add(
            this._service.execute()
                .pipe(
                    tap(this._state.orders.showOrders.set)
                )
                .subscribe()
        )
    }
    //#endregion
}