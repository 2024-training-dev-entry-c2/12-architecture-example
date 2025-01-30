import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrderRequest } from '../../domain/model/order-request';
import { Observable } from 'rxjs';
import { IOrder } from '../../domain/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {
  private http = inject(HttpClient);
  
  execute(orderRequest : IOrderRequest): Observable<IOrder>{
    return this.http.post<IOrder>('/pedidos',orderRequest);
  }
}
