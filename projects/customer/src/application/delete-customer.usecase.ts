import { inject, Injectable } from '@angular/core';
import { catchError, Observable, Subscription, tap, throwError } from 'rxjs';
import { State } from '../domain/state';
import { DeleteCustomerService } from '../infrastructure/services/delete-customer.service';
import { ModalComponent } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerUseCase {
  private readonly _service = inject(DeleteCustomerService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Public methods

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(customerId: number, modal: ModalComponent): Observable<void> {
    return this._service.execute(customerId).pipe(
      tap(() => {
        modal.toggle();
        const customers = this._state.customerState.customers.snapshot();
        const newCustomers = customers.filter(
          (cust) => cust.customerId !== customerId
        );
        this._state.customerState.customers.set(newCustomers);

        const currentCustomer =
          this._state.customerState.currentCustomer.snapshot();
        if (currentCustomer?.customerId === customerId) {
          this._state.customerState.currentCustomer.set(null);
        }
      }),
      catchError((error: Error) => {
        return throwError(() => error);
      })
    );
  }
  //#endregion
}
