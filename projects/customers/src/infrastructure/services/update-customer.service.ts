import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICustomer } from '../../domain/model/customer.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { ICreateCustomer } from '../../domain/model/create.customer.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateCustomerService {

  http = inject(HttpClient);

  constructor() { }

  execute(id: number, body: ICreateCustomer):Observable<ICustomer> {
    return this.http.put<ICustomer>(`${urlResources.customers}/${id}`, body);
  }
}
