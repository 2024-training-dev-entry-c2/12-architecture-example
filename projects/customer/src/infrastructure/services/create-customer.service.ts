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
export class CreateCustomerService {
  private _http = inject(HttpClient);

  execute(customer: ICustomerCreateRequest) {
    return this._http.post<ICustomer>(RESOURCES.CUSTOMERS, customer);
  }
}
