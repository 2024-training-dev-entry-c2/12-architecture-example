import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ICustomer,
  ICustomerCreateRequest,
} from '../../domain/models/customer.model';
import { RESOURCES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerService {
  private readonly _http = inject(HttpClient);

  execute(customer: ICustomer) {
    return this._http.put<ICustomerCreateRequest>(
      RESOURCES.customerById(customer.customerId),
      customer
    );
  }
}
