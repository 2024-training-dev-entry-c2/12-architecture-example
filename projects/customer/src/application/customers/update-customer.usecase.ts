import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import {
  ICustomer,
  ICustomerResponse,
} from '../../domain/model/customer.model';
import { UpdateCustomerService } from '../../infrastructure/services/update-customer.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerUsecase {
  private readonly _updateCustomerService = inject(UpdateCustomerService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  currentCustomer$(): Observable<ICustomerResponse> {
    return this._state.customers.currentCustomer.$();
  }

  snapshotCurrentCustomer(): ICustomerResponse {
    return this._state.customers.currentCustomer.snapshot();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(customerId: number, payload: ICustomer): void {
    this.subscriptions.add(
      this._updateCustomerService
        .execute(customerId, payload)
        .pipe(
          tap((updatedCustomer) => {
            const customers = this._state.customers.customerResponse.snapshot();
            const newCustomers = customers.map((c) =>
              c.id === updatedCustomer.id ? updatedCustomer : c
            );
            this._state.customers.customerResponse.set(newCustomers);
            this._state.customers.currentCustomer.set(null);
          })
        )
        .subscribe()
    );
  }

  selectCustomer(id: number): void {
    if (id === 0) {
      this._state.customers.currentCustomer.set(null);
      return;
    }
    this._state.customers.currentCustomer.set(
      this._state.customers.customerResponse.snapshot().find((c) => c.id === id)
    );
  }
}
