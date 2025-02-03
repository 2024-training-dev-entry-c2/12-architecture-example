import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iorder } from '../../domain/model/orders.model';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class CreateOrdersService {
  private readonly _http = inject(HttpClient);

  execute(order: Iorder): Observable<Iorder> {
    console.log(order, "crear orden desde servicio");
    return this._http.post<Iorder>(
      `${environment.URL_ORDERS}/add`,
      order
    );

  }
}
