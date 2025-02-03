import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { CreateCustomerService } from "../infrastructure/services/create-customer.service";
import { Subscription, tap } from "rxjs";
import { ICreateCustomer } from "../domain/model/create.customer.model";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class CreateCustomerUseCase {
  private readonly _service = inject(CreateCustomerService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;
  private router = inject(Router);

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(body: ICreateCustomer): void {
    this.subscriptions.add(
      this._service.execute(body)
        .pipe(
          tap((customer) => {
            const customers = this._state.customersState.customers.snapshot();
            this._state.customersState.customers.set([...customers, customer]);
            this.router.navigate(['/dashboard/customer/view']);
          }),
        ).subscribe()
    );
  }

}
