import { finalize, Observable, Subscription, tap } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { UpdateOrderService } from "../../infrastructure/services/update-order.service";
import { State } from "../../domain/state";
import { IOrder } from "../../domain/model/order.model";
import { ModalComponent } from "shared";

@Injectable({
    providedIn : 'root'
})
export class UpdateOrderUsecase {
    private readonly _service = inject(UpdateOrderService);
    private readonly _state = inject(State);
    private subscriptions : Subscription;

    //#region Observables
    currentOrder$() : Observable<IOrder> {
        return this._state.orders.currentOrder.$();
    }
    //#endregion 

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    selectOrder(id:number) : void {
        const currentOrder = this._state.orders.orders.snapshot().find(order => order.id == id);
        this._state.orders.currentOrder.set(currentOrder);
    }

    execute(order: IOrder, modal: ModalComponent): void{
        this.subscriptions.add(
            this._service.execute(order.id.toString(), order).pipe(
                tap(result =>{
                    const orders = this._state.orders.orders.snapshot()
                    .map( order => order.id == result.id ? result : order );
                    this._state.orders.orders.set(orders);
                    this._state.orders.currentOrder.set(null);
                }),
                finalize(()=> modal.toggle())  
            ).subscribe()
        );
    }
    //#endregion
}