import { inject, Injectable } from "@angular/core";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { DeleteService } from "../../infrastructure/services/order/delete.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteOrderUsecase {
  private readonly _service = inject(DeleteService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.orders.message.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(orderId: number) {
    this._service.execute(orderId).pipe(
      tap(result => {
        this._state.orders.message.set(result.message);
        const currentOrders = this._state.orders.listOrders.snapshot();
        this._state.orders.listOrders.set(currentOrders.filter(order => order.id !== orderId));
      }),
      finalize(() => this._state.orders.message.set(null))
    ).subscribe();
  }
  //#endregion
}