import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RESOURCES } from 'shared';
import { IOrder, IOrderForm } from '../../domain/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderService {
  private readonly _http = inject(HttpClient);

  execute(order: IOrderForm): Observable<IOrder> {
    return this._http.post<IOrder>(RESOURCES.ORDERS, order);
  }
}
