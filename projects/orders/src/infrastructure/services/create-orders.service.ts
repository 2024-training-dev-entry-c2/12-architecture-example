import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder } from '../../domain/models/orders.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateOrdersService {
  private readonly http = inject(HttpClient);

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`${environment.BASE_URL}orders`, order);
  }
}
