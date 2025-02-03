import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IOrder } from "../../domain/model/order.model";
import { DeleteOrderService } from "../../infrastructure/services/delete-order.service";

@Injectable({
    providedIn : 'root'
})
export class DeleteOrderUsecase {
    private readonly _service = inject(DeleteOrderService);
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

    execute(id: number): void{
        this.subscriptions.add(
            this._service.execute(id.toString()).pipe(
                tap(( ) =>{
                    const orders = this._state.orders.orders.snapshot()
                    .filter( order => order.id != id );
                    this._state.orders.orders.set(orders);
                })
            ).subscribe()
        );
    }
    //#endregion
}