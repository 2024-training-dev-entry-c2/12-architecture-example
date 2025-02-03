import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import {
  IOrderRequestDTO,
  IOrderResponse,
} from '../../domain/model/order.model';
import { UpdateOrderService } from '../../infrastructure/services/update-order.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateOrderUsecase {
  private readonly _updateOrderService = inject(UpdateOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  currentOrder$(): Observable<IOrderResponse> {
    return this._state.orders.currentOrder.$();
  }

  snapshotCurrentOrder(): IOrderResponse {
    return this._state.orders.currentOrder.snapshot();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(orderId: number, payload: IOrderRequestDTO): void {
    this.subscriptions.add(
      this._updateOrderService
        .execute(orderId, payload)
        .pipe(
          tap((updatedOrder) => {
            const orders = this._state.orders.orderResponse.snapshot();
            const newOrders = orders.map((c) =>
              c.id === updatedOrder.id ? updatedOrder : c
            );
            this._state.orders.orderResponse.set(newOrders);
            this._state.orders.currentOrder.set(null);
          })
        )
        .subscribe()
    );
  }

  selectOrder(id: number): void {
    if (id === 0) {
      this._state.orders.currentOrder.set(null);
      return;
    }
    this._state.orders.currentOrder.set(
      this._state.orders.orderResponse.snapshot().find((c) => c.id === id)
    );
  }
}
