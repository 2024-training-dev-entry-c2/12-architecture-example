import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IOrder } from '../../domain/model/order.model';


@Injectable({
  providedIn: 'root'
})
export class UpdateOrderService {
  private readonly _http = inject(HttpClient);

  execute(order: IOrder): Observable<IOrder> {
    return this._http.put<IOrder>(environment.apiUrl + 'orders/' + order.id, order);
  }
}