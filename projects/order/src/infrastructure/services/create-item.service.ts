import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrderItem } from '../../domain/model/orders.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateItemService {
  private readonly _http = inject(HttpClient);

  addOrderItem(idOrder: number, orderItem: IOrderItem): Observable<IOrderItem> {
    return this._http.post<IOrderItem>(`${environment.apiUrl}/orders/${idOrder}/orderItems`, orderItem);
  }
}
