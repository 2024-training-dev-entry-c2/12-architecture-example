import { inject, Injectable } from '@angular/core';
import { ListOrderService } from '../infrastructure/services/list/list-order.service';
import { Observable, Subscription, tap } from 'rxjs';
import { State } from '../domain/state';
import { IOrder } from '../domain/model/order.model';

@Injectable({
  providedIn: 'root',
})
export class ListOrdersUseCase {
  private readonly _service = inject(ListOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  order$(): Observable<IOrder[]> {
    return this._state.orders.orders.$();
  }

  //#region public method
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }
  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  execute(): void {
    this.subscriptions.add(
      this._service
        .getOrders()
        .pipe(
          tap((orders: IOrder[]) => {
            this._state.orders.orders.set(orders);
          })
        )
        .subscribe(
          () => {
            console.log('Orders obtenidos');
          },
          (err) => {
            console.error('Error al obtener menús:', err);
          }
        )
    );
  }
  //#endregion
}
