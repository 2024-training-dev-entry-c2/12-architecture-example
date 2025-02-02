import { inject, Injectable } from '@angular/core';
import { IOrder } from '../../domain/model/order.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';



@Injectable({
  providedIn: 'root'
})
export class DeleteOrderService {

  private http = inject(HttpClient);

  delete(id: number): Observable<IOrder[]> {
    return this.http.delete<IOrder[]>(environment.apiUrl + 'orders/'+ id);
  }
}
