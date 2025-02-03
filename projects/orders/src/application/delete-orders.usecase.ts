import { Injectable, inject } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { StateIndexOrders } from '../domain/state';
import { DeleteOrdersService } from '../infrastructure/services/delete-orders.service';

@Injectable({ providedIn: 'root' })
export class DeleteOrdersUseCase {
  private readonly _service = inject(DeleteOrdersService);
  private readonly _state = inject(StateIndexOrders);
  private subscription: Subscription;

  initSubscriptions(): void {
    this.subscription = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscription.unsubscribe();
  }

  execute(id: number): void {
    this.subscription.add(
      this._service
        .execute(id)
        .pipe(
          tap((order) => {
            const orders = this._state.ordersStates.orders.valueState();
            this._state.ordersStates.orders.changeState(
              orders.filter((o) => o.id !== order.id)
            );
          })
        )
        .subscribe()
    );
  }
}
