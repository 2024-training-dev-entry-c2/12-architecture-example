import { Injectable, inject } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Iorder } from '../domain/model/orders.model';
import { StateIndexOrders } from '../domain/state';
import { CreateOrdersService } from '../infrastructure/services/create-orders.service';

@Injectable({ providedIn: 'root' })
export class CreateOrdersUseCase {
  private readonly _service = inject(CreateOrdersService);
  private readonly _state = inject(StateIndexOrders);
  private subscription: Subscription;

  initSubscriptions(): void {
    this.subscription = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscription.unsubscribe();
  }

  execute(order: Iorder): void {
    this.subscription.add(
      this._service
        .execute(order)
        .pipe(
          tap((order) => {
            const orders = this._state.ordersStates.orders.valueState();
            this._state.ordersStates.orders.changeState([...orders, order]);
          })
        )
        .subscribe()
    );
  }
}
