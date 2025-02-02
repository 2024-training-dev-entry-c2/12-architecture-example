import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { CreateOrderService } from "../../infrastructure/services/create-order.service";
import { IOrders } from "../../domain/model/orders.model";


@Injectable({
    providedIn: 'root'
})

export class CreateOrderUseCase{

    private readonly _service = inject(CreateOrderService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    order$(): Observable<IOrders[]> {
      return this._state.orders.order.$();
    }
  

    initSubscriptions(): void {
      this.subscriptions = new Subscription();
    }
  
    destroySubscriptions(): void {
      this.subscriptions.unsubscribe();
    }
  
    execute(order: IOrders): void {
      this.subscriptions.add(
        this._service.createOrder(order)
          .pipe(
            tap(result => {
                this._state.orders.order.set([...this._state.orders.order.snapshot(), result]);
            })
          )
          .subscribe()
      );
    }


}