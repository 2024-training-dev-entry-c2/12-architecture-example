import { Injectable, inject } from '@angular/core';
import { Subscription, Observable, tap } from 'rxjs';
import { Iorder } from '../domain/model/orders.model';
import { StateIndexOrders } from '../domain/state';
import { GetOrdersService } from '../infrastructure/services/get-orders.service';

@Injectable({ providedIn: 'root' })
export class GetOrdersUsecase {
  private readonly _service = inject(GetOrdersService);
  private readonly _state = inject(StateIndexOrders);
  private subscription: Subscription;

  orders$(): Observable<Iorder[]> {
    return this._state.ordersStates.orders.$();
  }

  initSubscriptions(): void {
    this.subscription = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscription.unsubscribe();
  }

  execute(): void {
    this.subscription.add(
      this._service
        .execute()
        .pipe(tap(this._state.ordersStates.orders.changeState))
        .subscribe()
    );
  }
}
