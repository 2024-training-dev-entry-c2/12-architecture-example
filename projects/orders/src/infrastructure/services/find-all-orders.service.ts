import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IOrders } from '../../domain/model/orders.model';

@Injectable({
  providedIn: 'root'
})
export class FindAllOrdersService {

  http = inject(HttpClient);

  constructor() { }

  execute(): Observable<IOrders[]> {
    return this.http.get<IOrders[]>(urlResources.orders);
  }
}
