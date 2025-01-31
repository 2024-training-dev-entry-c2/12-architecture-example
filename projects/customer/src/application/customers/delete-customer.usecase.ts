import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';
import { DeleteCustomerService } from '../../infrastructure/services/delete-customer.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerUsecase {
  private readonly _deleteCustomerService = inject(DeleteCustomerService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(idCustomer: number): void {
    this.subscriptions.add(
      this._deleteCustomerService
        .execute(idCustomer)
        .pipe(
          tap(() => {
            const customers = this._state.customers.customerResponse.snapshot();
            this._state.customers.customerResponse.set(
              customers.filter((c) => c.id !== idCustomer)
            );
          })
        )
        .subscribe()
    );
  }
}
