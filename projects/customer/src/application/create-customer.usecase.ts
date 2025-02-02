import { inject, Injectable } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { ICustomer } from '../domain/models/customer.model';
import { State } from '../domain/state';
import { CreateCustomerService } from '../infrastructure/services/create-customer.service';

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

  execute(customer: ICustomer, modal: ModalComponent): void {
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
