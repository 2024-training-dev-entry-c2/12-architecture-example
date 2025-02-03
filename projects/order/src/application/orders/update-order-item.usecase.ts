import { inject, Injectable } from "@angular/core";
import {  Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { UpdateItemService } from "../../infrastructure/services/update-item.service";
import { IOrderItem } from "../../domain/model/orders.model";

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderItemUseCase {
  private readonly _service = inject(UpdateItemService);
  private readonly _state = inject(State);
  private subscriptions = new Subscription();

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  updateOrderItem(orderId: number, orderItemId: number, orderItem: IOrderItem): void {
    this.subscriptions.add(
      this._service.updateOrderItem(orderId, orderItemId, orderItem)
        .pipe(
          tap(result => {
            console.log('Order item updated:', result);
            const orderItems = this._state.orders.orderItem.snapshot();
            const index = orderItems.findIndex(item => item.idOrderItem === orderItemId);
            if (index !== -1) {
              orderItems[index] = result;
              this._state.orders.orderItem.set([...orderItems]);
            }
          })
        )
        .subscribe()
    );
  }
}
