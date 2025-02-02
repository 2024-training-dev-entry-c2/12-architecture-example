import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IOrder } from "../../domain/model/orders.model";
import { CreateOrderService } from "../../infrastructure/services/create-order.service";

@Injectable({
    providedIn: 'root'
})
export class CreateOrderUseCase {
    private readonly _service = inject(CreateOrderService);
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

    addOrder(order: IOrder, clientName: string): void {
        this.subscriptions.add(
          this._service.addOrder(order, clientName)
            .pipe(
              tap(result => {
                console.log('Order created:', result);
                const orders = this._state.orders.order.snapshot();
                this._state.orders.order.set([...orders, result]);
              })
            )
            .subscribe()
        );
      }
    //#endregion

    //#region Private Methods
    //#endregion
}