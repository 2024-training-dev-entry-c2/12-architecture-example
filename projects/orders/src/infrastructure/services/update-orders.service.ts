import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder } from '../../domain/models/orders.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateOrdersService {
  private http = inject(HttpClient);

  updateOrder(order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${environment.BASE_URL}orders/${order.id}`, order);
  }
}
