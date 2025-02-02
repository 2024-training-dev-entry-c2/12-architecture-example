import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESOURCES } from 'shared';
import { ICustomer } from '../../domain/models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerService {
  private _http = inject(HttpClient);

  execute(customer: ICustomer) {
    return this._http.post<ICustomer>(RESOURCES.CUSTOMERS, customer);
  }
}
