import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESOURCES } from 'shared';
import { ICustomer } from '../../domain/models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerService {
  private readonly _http = inject(HttpClient);

  execute(customer: ICustomer) {
    return this._http.put<ICustomer>(
      RESOURCES.customerById(customer.customerId),
      customer
    );
  }
}
