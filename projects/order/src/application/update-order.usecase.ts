import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IOrder } from "../domain/model/order.model";
import { ModalComponent } from "shared";
import { UpdateOrderService } from "../infrastructure/service/update-order.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderUsecase {
  private readonly _service = inject(UpdateOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  currentOrder$(): Observable<IOrder> {
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

  execute(order: IOrder, modal:ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.execute(order).pipe(
        tap(() => {
            const orders = this._state.orders.allOrders.snapshot();
            const newOrder = orders.map(o => o.id === order.id ? order : o);
            this._state.orders.allOrders.set(newOrder);
            modal.toggle();
        }),
      ).subscribe()
    );
  }

  selectOrder(id: number): void {
    const currentOrder = this._state.orders.allOrders.snapshot().find(order => order.id === id);
    if(currentOrder) {
      this._state.orders.currentOrder.set(currentOrder);
    } else {
      this._state.orders.currentOrder.set(null);
    }
  }
  //#endregion

  //#region Private Methods
  //#endregion
}