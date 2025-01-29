import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrders } from '../../domain/model/orders.model';


@Injectable({
  providedIn: 'root'
})
export class GetOrdersService {
 private apiUrl = 'http://localhost:8080/api/orders';
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = this.apiUrl; 

  getOrders(): Observable<IOrders[]> {
    return this._http.get<IOrders[]>(`${this.baseUrl}`);
  }

  getOrderById(id: number): Observable<IOrders> {
    return this._http.get<IOrders>(`${this.baseUrl}/${id}`);
  }
}
