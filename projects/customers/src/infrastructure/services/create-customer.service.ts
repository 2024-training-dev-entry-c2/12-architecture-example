import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICustomer } from '../../domain/model/customer.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { ICreateCustomer } from '../../domain/model/create.customer.model';

@Injectable({
  providedIn: 'root'
})
export class CreateCustomerService {

  http = inject(HttpClient);
  execute(body: ICreateCustomer): Observable<ICustomer>{
    return this.http.post<ICustomer>(urlResources.customers, body);
  }
}
