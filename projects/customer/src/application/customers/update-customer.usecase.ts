import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';
import { ICustomer } from '../../domain/model/customer.model';
import { UpdateCustomerService } from '../../infrastructure/services/update-customer.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerUsecase {
  private readonly _updateCustomerService = inject(UpdateCustomerService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number, payload: ICustomer): void {
    this.subscriptions.add(
      this._updateCustomerService
        .execute(id, payload)
        .pipe(
          tap((updatedCustomer) => {
            const customers = this._state.customers.customerResponse.snapshot();
            const index = customers.findIndex(
              (c) => c.id === updatedCustomer.id
            );
            if (index !== -1) {
              customers[index] = updatedCustomer;
              this._state.customers.customerResponse.set(customers);
            }
          })
        )
        .subscribe()
    );
  }
}
