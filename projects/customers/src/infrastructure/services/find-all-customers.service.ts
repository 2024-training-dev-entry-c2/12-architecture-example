import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICustomer } from '../../domain/model/customer.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class FindAllCustomersService {
  http = inject(HttpClient);

  constructor() { }

  execute():Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(urlResources.customers)
    .pipe(
      tap(console.log)
    );
  }

}
