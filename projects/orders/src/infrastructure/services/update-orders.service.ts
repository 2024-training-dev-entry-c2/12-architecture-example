import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iorder } from '../../domain/model/orders.model';

@Injectable({ providedIn: 'root' })
export class UpdateOrdersService {
  private readonly _http = inject(HttpClient);

  execute(order: Iorder): Observable<Iorder> {
    return this._http.put<Iorder>(
      'http://localhost:8080/api/orders/edit/' + order.id,
      order
    );
  }
}
