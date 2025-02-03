import { inject, Injectable } from "@angular/core";
import { ListOrderService } from "../../infrastructure/services/list-order.service";
import { Subscription, Observable, tap } from "rxjs";
import { IOrder } from "../../domain/model/order.model";
import { State } from "../../domain/state";

@Injectable({
    providedIn : 'root'
})
export class ListOrdersUsecase {
    private readonly _service = inject(ListOrderService);
    private readonly _state = inject(State);
    private subscriptions : Subscription;

    //#region Observables
    orders$() : Observable<IOrder[]> {
        return this._state.orders.orders.$();
    }
    //#endregion 

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(): void{
        this.subscriptions.add(
            this._service.execute().pipe(
                tap( this._state.orders.orders.set )
            ).subscribe()
        );
    }
    //#endregion
}