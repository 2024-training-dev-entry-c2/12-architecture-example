import { inject, Injectable } from '@angular/core';
import { IOrder } from '../../domain/model/order.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';



@Injectable({
  providedIn: 'root'
})
export class AddOrderService {

  private http = inject(HttpClient);

  create(order: Partial<IOrder>): Observable<IOrder> {
    return this.http.post<IOrder>(environment.apiUrl + 'orders', order);
  }
}
