import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IOrder } from "../domain/model/order.model";
import { GetAllOrdersService } from "../infrastructure/service/get-all-orders.service";

@Injectable({
  providedIn: 'root'
})
export class GetAllOrdersUsecase {
  private readonly _service = inject(GetAllOrdersService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  orders$(): Observable<IOrder[]> {
    return this._state.orders.allOrders.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service.execute()
        .pipe(
          tap(result => {
            this._state.orders.allOrders.set(result);
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}