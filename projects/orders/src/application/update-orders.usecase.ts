import { Injectable, inject } from '@angular/core';
import { Subscription, Observable, tap } from 'rxjs';
import { Iorder } from '../domain/model/orders.model';
import { StateIndexOrders } from '../domain/state';
import { UpdateOrdersService } from '../infrastructure/services/update-orders.service';

@Injectable({ providedIn: 'root' })
export class UpdateOrdersUseCase {
  private readonly _service = inject(UpdateOrdersService);
  private readonly _state = inject(StateIndexOrders);
  private subscription: Subscription;

  initSubscriptions(): void {
    this.subscription = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscription.unsubscribe();
  }

  menuUnique$(): Observable<Iorder> {
    return this._state.ordersStates.orderUnique.$();
  }

  execute(order: Iorder): void {
    this.subscription.add(
      this._service
        .execute(order)
        .pipe(
          tap((order) => {
            const orders = this._state.ordersStates.orders.valueState();
            const newOrders = orders.map((o) => {
              if (o.id === order.id) {
                return order;
              }
              return o;
            });
            this._state.ordersStates.orders.changeState(newOrders);
            this._state.ordersStates.orderUnique.changeState(null);
          })
        )
        .subscribe()
    );
  }

  selectOrder(id: number): void {
    const orderActual = this._state.ordersStates.orders
      .valueState()
      .find((o) => o.id === id);
    this._state.ordersStates.orderUnique.changeState(orderActual);
  }
}
