import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IOrder } from '../../domain/model/orders.model';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {
   private readonly _http = inject(HttpClient);
   
  addOrder(order: IOrder, clientName: string): Observable<IOrder> {
    return this._http.post<IOrder>(`${environment.apiUrl}/orders/${clientName}`, order);
  }
}
