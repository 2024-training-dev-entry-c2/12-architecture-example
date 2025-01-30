import { inject, Injectable } from "@angular/core";
import { IOrderRequest } from "../domain/model/order.model";
import { UpdateOrderService } from "../infrastructure/services/update/update-order.service";
import { State } from "../domain/state";
import { Subscription, tap } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class UpdateOrderUsecase {
  private readonly _service = inject(UpdateOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  execute(order: IOrderRequest, id: number): void {
    this.subscriptions.add(
      this._service
        .updateOrder(order, id)
        .pipe(
          tap((result) => {
            const orders = this._state.orders.orders.snapshot();
            const updatedOrders = orders.map((order) =>
              order.id === id ? result : order
            );
            this._state.orders.orders.set(updatedOrders);
          })
        )
        .subscribe()
    );
  }
  //#endregion

}   