import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../domain/model/order.model';
import { urlResources } from 'shared';
import { IOrderRequest } from '../../domain/model/order-request.model';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {
  private http = inject(HttpClient);
  
  execute(orderRequest : IOrder): Observable<IOrder>{
    const orderRequestTransform : IOrderRequest = 
    {
      id : null,
      clientId: orderRequest.client.id,
      dishes: orderRequest.dishes,
      date: orderRequest.date
    }
    return this.http.post<IOrder>(urlResources.orders,orderRequestTransform);
  }
  
}
