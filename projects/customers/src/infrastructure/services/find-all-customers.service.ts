import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICustomer } from '../../domain/model/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class FindAllCustomersService {
  http = inject(HttpClient);
  url: string = `http://localhost:8080/api/v1/customer`;

  constructor() { }

  execute():Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(this.url)
    .pipe(
      tap(console.log)
    );
  }

}
