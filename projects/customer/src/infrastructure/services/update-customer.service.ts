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
export class UpdateCustomerService {
  private http = inject(HttpClient);

  execute(id: number, payload: ICustomer): Observable<ICustomerResponse> {
    return this.http.put<ICustomerResponse>(
      urlResources.customerOperationsById(id),
      payload
    );
  }
}
