import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IOrder } from '../../domain/models/orders.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ListOrdersService {
  private http = inject(HttpClient);

  getOrders(): Observable<IOrder[]> {
    return this.http.get<{ success: boolean; message: string; data: IOrder[] }>(`${environment.BASE_URL}orders`)
          .pipe(
            map(response => response.data)
          );
  }
}
