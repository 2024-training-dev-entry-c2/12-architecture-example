import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrderResponse } from '../../domain/model/order.model';
import { ListOrdersService } from '../../infrastructure/services/list-orders.service';

@Injectable({
  providedIn: 'root',
})
export class ListOrdersUsecase {
  private readonly _listOrdersService = inject(ListOrdersService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  orderResponse$(): Observable<IOrderResponse[]> {
    return this._state.orders.orderResponse.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(date: string): void {
    this.subscriptions.add(
      this._listOrdersService
        .execute(date)
        .pipe(tap((orders) => this._state.orders.orderResponse.set(orders)))
        .subscribe()
    );
  }
}
