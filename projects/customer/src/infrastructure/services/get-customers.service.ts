import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../../domain/models/customer.model';
import { RESOURCES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class GetCustomersService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<ICustomer[]> {
    return this._http.get<ICustomer[]>(RESOURCES.CUSTOMERS);
  }
}
