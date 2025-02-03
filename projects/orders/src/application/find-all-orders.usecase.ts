import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";

import { State } from "../domain/state";
import { FindAllOrdersService } from "../infrastructure/services/find-all-orders.service";


@Injectable({
  providedIn: 'root'
})
export class FindAllOrdersUseCase{
  private readonly _service = inject(FindAllOrdersService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  orders$(){
    return this._state.ordersState.orders.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(){
    this.subscriptions.add(
      this._service.execute()
      .pipe(
        tap(this._state.ordersState.orders.set)
      )
      .subscribe()
    )
  }
}
