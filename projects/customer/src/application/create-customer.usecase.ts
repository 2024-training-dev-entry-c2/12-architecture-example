import { inject, Injectable } from '@angular/core';
import { CreateCustomerService } from '../infrastructure/services/create-customer.service';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { ICustomerCreateRequest } from '../domain/models/customer.model';
import { CustomersState } from '../domain/state/customers.state';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerUseCase {
  private readonly _service = inject(CreateCustomerService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //   #region Public methods
  initSubscriptions() {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions() {
    this.subscriptions.unsubscribe();
  }

  execute(customer: ICustomerCreateRequest, modal: ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service
        .execute(customer)
        .pipe(
          tap((c) => {
            const customers = this._state.customerState.customers.snapshot();
            this._state.customerState.customers.set([...customers, c]);
            modal.toggle();
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
