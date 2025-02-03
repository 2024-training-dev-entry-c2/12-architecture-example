import { Injectable, inject } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrder } from '../domain/models/order.model';
import { GetOrdersService } from '../infrastructure/services/get-orders.service';
import { OrdersState } from '../domain/state/orders.state';
import { State } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class GetOrdersUseCase {
  private readonly _service = inject(GetOrdersService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region observables

  orders$(): Observable<IOrder[]> {
    return this._state.ordersState.orders.$();
  }
  //#endregion

  initSubscriptions() {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions() {
    this.subscriptions?.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(tap((orders) => this._state.ordersState.orders.set(orders)))
        .subscribe()
    );
  }
}
