import { inject, Injectable } from "@angular/core";
import { ICreateCustomer } from "../domain/model/create.customer.model";
import { ICustomer } from "../domain/model/customer.model";
import { UpdateCustomerService } from "../infrastructure/services/update-customer.service";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";

@Injectable(
  {providedIn: 'root'}
)
export class UpdateCustomerUseCase {

  private readonly _service = inject(UpdateCustomerService);
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

  execute(id: number, body: ICreateCustomer): void {
    this.subscriptions.add(
      this._service.execute(id, body)
        .pipe(
          tap(() => {
            const customer = this._state.customersState.currentCustomer.snapshot();
            const customers = this._state.customersState.customers.snapshot();
            const currentCustomers = customers.map(c => c.id === customer.id ? customer : c);
            this._state.customersState.customers.set(currentCustomers);
            this._state.customersState.currentCustomer.set(null);
          }),
        ).subscribe()
    );
  }

}
