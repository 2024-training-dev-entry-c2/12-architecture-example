import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../domain/model/order.model';

@Injectable({
    providedIn: 'root'
})

export class UpdateOrderService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/pedido";

    update(id: number, order: Partial<IOrder>): Observable<IOrder> {
        return this.http.put<IOrder>(`${this.url}/${id}`, order);
    }

}