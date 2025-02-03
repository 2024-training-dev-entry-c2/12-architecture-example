import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IOrder } from "../domain/model/order.model";
import { DeleteOrderService } from "../infrastructure/service/delete-order.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteOrderUsecase {
  private readonly _service = inject(DeleteOrderService);
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

  execute(id: number): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.delete(id).pipe(
        tap(() => {
          console.log(`Ordere con ID ${id} eliminado`);
          const updatedOrders = this._state.orders.allOrders.snapshot().filter(order => order.id !== id);
          this._state.orders.allOrders.set(updatedOrders);
        }),
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}