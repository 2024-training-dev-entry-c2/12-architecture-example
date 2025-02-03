import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iorder } from '../../domain/model/orders.model';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class UpdateOrdersService {
  private readonly _http = inject(HttpClient);

  execute(order: Iorder): Observable<Iorder> {
    return this._http.put<Iorder>(
      `${environment.URL_ORDERS}/edit/${order}`,
      order
    );
  }
}
