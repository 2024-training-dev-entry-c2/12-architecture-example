import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrders } from '../../domain/model/orders.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetOrdersService {

 private readonly apiUrl = environment.apiUrls.order;
  private readonly _http = inject(HttpClient);

  getOrders(): Observable<IOrders[]> {
    return this._http.get<IOrders[]>(`${this.apiUrl}`);
  }

}
