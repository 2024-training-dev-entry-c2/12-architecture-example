import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../domain/model/order.model';
import { IOrderRequest } from '../../domain/model/order-request.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderService {
  private http = inject(HttpClient);
  
  execute(id: string, orderRequest: IOrder): Observable<IOrder> {
    const orderRequestTransform : IOrderRequest = 
    {
      id : null,
      clientId: orderRequest.client.id,
      dishes: orderRequest.dishes,
      date: orderRequest.date
    }
    return this.http.put<IOrder>(urlResources.ordersOperationsById(id), orderRequestTransform);
  }
}
