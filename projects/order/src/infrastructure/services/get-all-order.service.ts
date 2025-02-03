import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../domain/model/order.model';

@Injectable({
    providedIn: 'root'
})

export class GetAllOrderService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/pedido";

    getAll(): Observable<IOrder[]> {
        return this.http.get<IOrder[]>(this.url);
    }

}