import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RESOURCES } from 'shared';
import { IOrder } from '../../domain/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class GetOrdersService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<IOrder[]> {
    return this._http.get<IOrder[]>(RESOURCES.ORDERS);
  }
}
