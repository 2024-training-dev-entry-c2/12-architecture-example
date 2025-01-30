import { inject, Injectable } from '@angular/core';
import { CreateOrderService } from '../infrastructure/services/create/create-order.service';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrder, IOrderRequest } from '../domain/model/order.model';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderUseCase {
  private readonly _service = inject(CreateOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;
  order$(): Observable<IOrder> {
    return this._state.orders.order.$();
  }

  //#region public method
  initSubscription(): void {
    this.subscriptions = new Subscription();
  }

  destroySubcriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(order: IOrderRequest): void {
    this.subscriptions.add(
      this._service
        .addOrder(order)
        .pipe(
          tap((result) => {
            this._state.orders.order.set(result);
          })
        )
        .subscribe()
    );
  }
  //#endregio
}
