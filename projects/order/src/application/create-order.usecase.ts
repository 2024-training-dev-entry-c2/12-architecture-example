import { Injectable, inject } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { IOrderForm } from '../domain/models/order.model';
import { State } from '../domain/state';
import { CreateOrderService } from '../infrastructure/services/create-order.service';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderUseCase {
  private readonly _service = inject(CreateOrderService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions() {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions() {
    this.subscriptions?.unsubscribe();
  }

  execute(order: IOrderForm, modal: ModalComponent): void {
    this.subscriptions.add(
      this._service
        .execute(order)
        .pipe(
          tap((o) => {
            const orders = this._state.ordersState.orders.snapshot();
            this._state.ordersState.orders.set([...orders, o]);
            modal.toggle();
          })
        )
        .subscribe()
    );
  }
}
