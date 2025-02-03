import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../domain/model/order.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ListOrderService {
  private http = inject(HttpClient);
  
  execute(): Observable<IOrder[]>{
    return this.http.get<IOrder[]>(urlResources.orders);
  }
}
