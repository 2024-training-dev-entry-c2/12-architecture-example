import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlResources } from 'shared';
import { Observable } from 'rxjs';
import { IOrderResponse } from '../../domain/model/order.model';

@Injectable({
  providedIn: 'root',
})
export class ListOrdersService {
  private http = inject(HttpClient);

  execute(date: string): Observable<IOrderResponse[]> {
    const url = `${urlResources.order}/by-date`;
    const params = { date };
    return this.http.get<IOrderResponse[]>(url, { params });
  }
}
