import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IOrder } from "../domain/model/order.model";
import { ModalComponent } from "shared";
import { AddOrderService } from "../infrastructure/service/add-order.service";

@Injectable({
  providedIn: 'root'
})
export class AddOrderUsecase {
  private readonly _service = inject(AddOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  orders$(): Observable<IOrder[]> {
    return this._state.orders.allOrders.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    if (!this.subscriptions || this.subscriptions.closed) {
      this.subscriptions = new Subscription();
    }
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(order: Partial<IOrder>, modal:ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.create(order).pipe(
        tap((order) => {
            console.log(`Order ${order} creado`);
            const orders = this._state.orders.allOrders.snapshot();
            this._state.orders.allOrders.set([...orders, order]);
            modal.toggle();
        }),
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}