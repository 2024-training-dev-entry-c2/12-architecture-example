import { inject, Injectable } from '@angular/core';
import { UpdateCustomerService } from '../infrastructure/services/update-customer.service';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { ICustomer } from '../domain/models/customer.model';
import { ModalComponent } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerUseCase {
  private readonly _service = inject(UpdateCustomerService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region observables
  currentCustomer$(): Observable<ICustomer> {
    return this._state.customerState.currentCustomer.$();
  }
  //#endregion

  //#region Public methods
  initSubscriptions() {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions() {
    this.subscriptions.unsubscribe();
  }

  execute(customer: ICustomer, modal: ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service
        .execute(customer)
        .pipe(
          tap((c) => {
            const customers = this._state.customerState.customers.snapshot();
            const newCustomers = customers.map((cust) =>
              cust.customerId === c.customerId ? c : cust
            );
            this._state.customerState.customers.set(newCustomers);
            this._state.customerState.currentCustomer.set(null);
            modal.toggle();
          })
        )
        .subscribe()
    );
  }

  selectCustomer(customerId: number): void {
    const currentCustomer = this._state.customerState.customers
      .snapshot()
      .find((c) => c.customerId === customerId);
    this._state.customerState.currentCustomer.set(currentCustomer);
  }
  //#endregion
}
