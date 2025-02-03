import { inject, Injectable } from '@angular/core';
import { RemoveOrderService } from '../infrastructure/services/remove/remove-order.service';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoveOrderUsecase {
  private readonly _service = inject(RemoveOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .deleteOrder(id)
        .pipe(
          tap(() => {
            const orders = this._state.orders.orders.snapshot();
            const updatedOrders = orders.filter((order) => order.id !== id);
            this._state.orders.orders.set(updatedOrders);
          })
        )
        .subscribe()
    );
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  //#endregion
}
