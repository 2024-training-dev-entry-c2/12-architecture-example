import { inject, Injectable } from "@angular/core";
import { FindAllCustomersService } from "../infrastructure/services/find-all-customers.service";
import { State } from "../domain/state";
import { Subscription, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FindAllCustomersCase{
  private readonly _service = inject(FindAllCustomersService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  customers$(){
    return this._state.customersState.customers.$();
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
        tap(this._state.customersState.customers.set)
      )
      .subscribe()
    )
  }
}

