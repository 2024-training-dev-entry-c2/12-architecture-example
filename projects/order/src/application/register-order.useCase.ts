import { inject, Injectable } from "@angular/core";
import { tap, Subscription, switchMap, map, Observable } from "rxjs";
import { IOrder } from "../domain/model/order.model";
import { State } from "../domain/state";
import { RegisterOrderService } from "../infrastructure/services/register-order.service";
import { GetAllOrderService } from "../infrastructure/services/get-all-order.service";

@Injectable({
    providedIn: 'root'
})

export class RegisterOrderUseCase {
    private readonly _createService = inject(RegisterOrderService);
    private readonly _getAllService = inject(GetAllOrderService);
    private readonly _state = inject(State);

    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(newOrder: Partial<IOrder>): Observable<void> {
        return this._createService.save(newOrder).pipe(
            tap(response => {
                console.log(`Orden creada: ${response}`);
            }),
            switchMap(() => this._getAllService.getAll()),
            tap(updatedOrderList => {
                this._state.orders.order.set(updatedOrderList);
            }),
            map(() => void 0) 
        );
    }
}
