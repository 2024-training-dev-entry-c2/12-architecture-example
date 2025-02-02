import { inject, Injectable } from '@angular/core';
import { IOrder } from '../../domain/model/orders.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ListOrdersService {
  private readonly _http = inject(HttpClient);

  getOrders(): Observable<IOrder[]> {
    return this._http.get<IOrder[]>(environment.apiUrl + '/orders');
  }
}
