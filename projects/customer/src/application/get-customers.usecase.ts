import { inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { ICustomer } from '../domain/models/customer.model';
import { State } from '../domain/state';
import { GetCustomersService } from '../infrastructure/services/get-customers.service';

@Injectable({
  providedIn: 'root',
})
export class GetCustomersUsecase {
  private readonly _service = inject(GetCustomersService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region observables
  customers$(): Observable<ICustomer[]> {
    return this._state.customerState.customers.$();
  }
  //#endregion

  //#region public methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(
          tap((c) => {
            this._state.customerState.customers.set(c);
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
