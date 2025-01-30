import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IOrder } from '../../../domain/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ListOrderService {
  private http = inject(HttpClient);
  getOrders(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8080/order').pipe(
      map((response) => this.validateResponse(response)),
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => new Error('Failed to fetch orders'));
      })
    );

  }
  private validateResponse(response: IOrder): any[] {
    if (Array.isArray(response)) {
      return response.map((order) => {
        if (
          typeof order.id === 'number' &&
          typeof order.client.id === 'number' &&
          typeof order.localDate === 'string' &&
          typeof order.dishfoodIds === 'object' &&
          typeof order.totalPrice === 'number' && 
          Array.isArray(order.dishfoodIds)
        ) {
          return order as IOrder;
        } else {
          throw new Error('Invalid order structure');
        }
      });
    } else {
      throw new Error('Invalid response structure');
    }
  }
}
