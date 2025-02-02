import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../domain/model/order.model';

@Injectable({
    providedIn: 'root'
})

export class RegisterOrderService {
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/pedido";

    save(order: Partial<IOrder>): Observable<string> {
        return this.http.post(
            this.url,
            order,
            { responseType: 'text' }
        ) as Observable<string>;
    }

}