import { inject, Injectable } from "@angular/core";
import { ICustomer } from "../domain/model/customer.model";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { DeleteCustomerService } from "../infrastructure/services/delete-customer.service";

@Injectable(
  {providedIn: 'root'}
)
export class DeleteCustomerUseCase {
  private readonly _service = inject(DeleteCustomerService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;


  currentCustomer$(): Observable<ICustomer> {
    return this._state.customersState.currentCustomer.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(customer: ICustomer): void {
    this._state.customersState.currentCustomer.set(customer);
    this.subscriptions.add(
      this._service.execute(customer.id)
        .pipe(
          tap(() => {
            const selectCustomer = this._state.customersState.currentCustomer.snapshot();
            const customers = this._state.customersState.customers.snapshot().filter(c => c.id !== selectCustomer.id);
            this._state.customersState.customers.set(customers);
            this._state.customersState.currentCustomer.set(null);
          }),
        ).subscribe()
    );
  }

}
