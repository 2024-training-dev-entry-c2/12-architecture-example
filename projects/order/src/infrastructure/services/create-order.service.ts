import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlResources } from 'shared';
import { IOrder, IOrderResponse } from '../../domain/model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderService {
  private http = inject(HttpClient);

  execute(payload: IOrder): Observable<IOrderResponse> {
    return this.http.post<IOrderResponse>(urlResources.order, payload);
  }
}
