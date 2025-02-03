import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';
import { IOrder } from '../../domain/model/order.model';
import { CreateOrderService } from '../../infrastructure/services/create-order.service';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderUsecase {
  private readonly _createOrderService = inject(CreateOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(payload: IOrder): void {
    this.subscriptions.add(
      this._createOrderService
        .execute(payload)
        .pipe(
          tap((result) => {
            const orders = this._state.orders.orderResponse.snapshot();
            this._state.orders.orderResponse.set([...orders, result]);
          })
        )
        .subscribe()
    );
  }
}
