import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iorder } from '../../domain/model/orders.model';

@Injectable({ providedIn: 'root' })
export class CreateOrdersService {
  private readonly _http = inject(HttpClient);

  execute(order: Iorder): Observable<Iorder> {
    return this._http.post<Iorder>(
      'http://localhost:8080/api/orders/add',
      order
    );
  }
}
