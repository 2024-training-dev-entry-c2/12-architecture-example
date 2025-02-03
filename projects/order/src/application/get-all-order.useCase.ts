import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IOrder } from "../domain/model/order.model";
import { State } from "../domain/state";
import { GetAllOrderService } from "../infrastructure/services/get-all-order.service";

@Injectable({
  providedIn: 'root'
})
export class GetAllOrderUseCase {
  private readonly _service = inject(GetAllOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  orders$(): Observable<IOrder[]> {
    return this._state.orders.order.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service.getAll()
        .pipe(
          tap(orders => {
            console.log(orders);
            this._state.orders.order.set(orders);
          })
        )
        .subscribe()
    );
  }
}
