import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IOrder } from "../domain/model/order.model";
import { State } from "../domain/state";
import { GetByIdOrderService } from "../infrastructure/services/get-by-id-order.service";

@Injectable({
    providedIn: 'root'
})

export class GetByIdOrderUseCase {
    private readonly _service = inject(GetByIdOrderService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    order$(): Observable<IOrder> {
        return this._state.orders.oneOrder$.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number): void {
        this.subscriptions.add(
            this._service.getById(id)
                .pipe(
                    tap(order => {
                        console.log(order);
                        this._state.orders.oneOrder$.set(order);
                    })
                )
                .subscribe()
        );
    }
}
