import { inject, Injectable } from '@angular/core';
import { environment } from 'shared';
import { OrdersState } from '../../domain/state/orders.state';
import { HttpClient } from '@angular/common/http';
import { IOrders } from '../../domain/model/orders.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditOrderService {
private readonly apiUrl = environment.apiUrls.order;
     private readonly ordersState = inject(OrdersState);
     private readonly _http = inject(HttpClient);
   
     getOrdersState() {
       return this.ordersState.store();
     }
   
     editOrders(order: IOrders): Observable<IOrders>{
      return this._http.put<IOrders>(this.apiUrl + `/${order.id}`, order);
     }
}
