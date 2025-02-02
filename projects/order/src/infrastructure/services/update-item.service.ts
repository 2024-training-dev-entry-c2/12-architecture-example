import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrderItem } from '../../domain/model/orders.model';
import { environment } from 'shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateItemService {
  private readonly _http = inject(HttpClient);

  updateOrderItem(idOrder: number, idOrderItem: number, orderItem: IOrderItem): Observable<IOrderItem> {
    return this._http.put<IOrderItem>(`${environment.apiUrl}/orders/${idOrder}/orderItems/${idOrderItem}`, orderItem);
  }
}
