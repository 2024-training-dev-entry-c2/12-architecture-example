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
    console.log(order);
    
    this.subscriptions.add(
      this._service
        .addOrder(order)
        .pipe(
          tap((result) => {
            const orders = this._state.orders.orders.snapshot();
            this._state.orders.orders.set([...orders, result]);
          })
        )
        .subscribe()
    );
  }
  //#endregio
}
