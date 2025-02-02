import { inject, Injectable } from '@angular/core';
import { environment } from 'shared';
import { OrdersState } from '../../domain/state/orders.state';
import { HttpClient } from '@angular/common/http';
import { IOrders } from '../../domain/model/orders.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteOrderService {
  private readonly apiUrl = environment.apiUrls.order;
  private readonly ordersState = inject(OrdersState);
  private readonly _http = inject(HttpClient);

  geeOrdersState() {
    return this.ordersState.store();
  }

  deleteOrder(order: IOrders): Observable<IOrders>{
   return this._http.delete<IOrders>(this.apiUrl + `/${order.id}`);
  }

}
