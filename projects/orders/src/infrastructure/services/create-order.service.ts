import { inject, Injectable } from '@angular/core';
import { IOrder } from '../../domain/model/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {
  private _http = inject(HttpClient);

  execute(order: IOrder): Observable<IOrder> {
    return this._http.post<IOrder>(urlResources.orders, order, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
