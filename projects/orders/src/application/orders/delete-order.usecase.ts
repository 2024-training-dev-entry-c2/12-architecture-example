import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { DeleteOrderService } from "../../infrastructure/services/delete-order.service";
import { IOrders } from "../../domain/model/orders.model";


@Injectable({
    providedIn: 'root'
})

export class DeleteOrderUseCase{
    private readonly _service = inject(DeleteOrderService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    order$(): Observable<IOrders[]> {
        return this._state.orders.order.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
      }

      
    execute(order: IOrders): void {
        this.subscriptions.add(
            this._service.deleteOrder(order)
                .pipe(
                    tap(() => {
                        const currentOrders = this._state.orders.order.snapshot();
                        const filteredorders = currentOrders.filter(o => o.id !== order.id);
                        this._state.orders.order.set(filteredorders);
                    })
                )
                .subscribe()
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }


}