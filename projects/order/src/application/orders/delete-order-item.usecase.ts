import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { DeleteItemService } from "../../infrastructure/services/delete-item.service";
import { IOrderItem } from "../../domain/model/orders.model";

@Injectable({
  providedIn: 'root'
})
export class DeleteOrderItemUseCase {
  private readonly _service = inject(DeleteItemService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  deleteOrderItem(orderId: number, orderItemId: number): void {
      this._service.deleteOrderItem(orderId, orderItemId)
        .pipe(
          tap(() => {
            console.log('Order item deleted');
            const orderItems = this._state.orders.orderItem.snapshot();
            const index = orderItems.findIndex(item => item.idOrderItem === orderItemId);
            if (index !== -1) {
              orderItems.splice(index, 1);
              this._state.orders.orderItem.set([...orderItems]);
            }
          })
        )
        .subscribe()
  }
}
