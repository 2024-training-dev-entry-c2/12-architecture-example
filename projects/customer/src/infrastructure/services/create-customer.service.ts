import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlResources } from 'shared';
import {
  ICustomer,
  ICustomerResponse,
} from '../../domain/model/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerService {
  private http = inject(HttpClient);

  execute(payload: ICustomer): Observable<ICustomerResponse> {
    return this.http.post<ICustomerResponse>(urlResources.customer, payload);
  }
}
