import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';
import { CreateCustomerService } from '../../infrastructure/services/create-customer.service';
import { ICustomer } from '../../domain/model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerUsecase {
  private readonly _createCustomerService = inject(CreateCustomerService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(payload: ICustomer): void {
    this.subscriptions.add(
      this._createCustomerService
        .execute(payload)
        .pipe(
          tap((result) => {
            const customers = this._state.customers.customerResponse.snapshot();
            this._state.customers.customerResponse.set([...customers, result]);
          })
        )
        .subscribe()
    );
  }
}
