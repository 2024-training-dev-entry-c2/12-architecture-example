import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IOrder, IOrderRequest } from '../../../domain/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {
  private http = inject(HttpClient);
  addOrder(order: IOrderRequest): Observable<any> {
    console.log(order);
    return this.http
      .post<any>('http://localhost:8080/order', order)
      .pipe(
        map((response) => this.validateObjectResponse(response)),
        catchError((error) => {
          console.error('Error fetching orders:', error);
          return throwError(() => new Error('Failed to fetch orders'));
        })
      );
  }
  private validateObjectResponse(response: any): IOrder {
    if (
      typeof response.id === 'number' &&
      typeof response.client.id === 'number' &&
      typeof response.localDate === 'string' &&
      typeof response.dishfoodIds === 'object' &&
      typeof response.totalPrice === 'number' && 
      Array.isArray(response.dishfoodIds)
    ) {
      return response as IOrder;
    } else {
      throw new Error('Invalid order structure');
    }
  }

}
