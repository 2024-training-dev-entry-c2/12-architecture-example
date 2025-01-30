import { inject, Injectable } from '@angular/core';
import { ListCustomersService } from '../../infrastructure/services/list-customers.service';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { ICustomerResponse } from '../../domain/model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class ListCustomersUsecase {
  private readonly _listCustomersService = inject(ListCustomersService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  customerResponse(): ICustomerResponse[] {
    return this._state.customers.customerResponse.snapshot();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._listCustomersService
        .execute()
        .pipe(
          tap((customers) =>
            this._state.customers.customerResponse.set(customers)
          )
        )
        .subscribe()
    );
  }
}
