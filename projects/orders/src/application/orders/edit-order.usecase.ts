import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { catchError, Observable, Subscription, tap } from 'rxjs';
import { EditOrderService } from '../../infrastructure/services/edit-order.service';
import { IOrders } from '../../domain/model/orders.model';

@Injectable({
  providedIn: 'root',
})
export class EditOrderUseCase {
  private readonly _service = inject(EditOrderService);
  private readonly _state = inject(State);
  private subscriptions = new Subscription();

  order$(): Observable<IOrders[]> {
    return this._state.orders.order.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  execute(order: IOrders): Observable<IOrders> {
    const currentOrders = this._state.orders.order.snapshot();
    const optimisticUpdate = currentOrders.map((o) =>
      o.id === order.id ? { ...o, ...order } : o
    );
  
    this._state.orders.order.set(optimisticUpdate);
  
    return this._service.editOrders(order).pipe(
      tap((updatedOrder) => {
        const updatedOrders = this._state.orders.order.snapshot().map((o) =>
          o.id === updatedOrder.id ? updatedOrder : o
        );
        this._state.orders.order.set(updatedOrders);
      }),
      catchError((error) => {
        this._state.orders.order.set(currentOrders);
        console.error('Error updating order:', error);
        throw error;
      })
    );
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
}