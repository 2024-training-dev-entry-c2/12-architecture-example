import { inject, Injectable } from '@angular/core';
import { IOrder } from '../../domain/model/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderService {
  private http = inject(HttpClient);

  execute(orderId: number, order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${urlResources.orders}/${orderId}`, order, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
