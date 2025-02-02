import { inject, Injectable } from '@angular/core';
import { DeleteCustomerService } from '../infrastructure/services/delete-customer.service';
import { State } from '../domain/state';
import { Observable, tap, finalize, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerUseCase {
  private readonly _service = inject(DeleteCustomerService);
  private readonly _state = inject(State);

  execute(customerId: number): Observable<void> {
    return this._service.execute(customerId).pipe(
      tap(() => {
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
}
