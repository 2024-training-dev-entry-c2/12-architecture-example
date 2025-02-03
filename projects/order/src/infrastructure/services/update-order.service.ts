import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder } from '../../domain/model/orders.model';
import { environment } from 'shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderService {
  private readonly _http = inject(HttpClient);

  updateOrder(id: number, payload: IOrder): Observable<IOrder> {
    return this._http.put<IOrder>(`${environment.apiUrl}/orders/${id}`, payload);

  }
}
