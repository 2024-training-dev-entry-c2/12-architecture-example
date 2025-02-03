import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, IResponse } from 'shared';
import { IOrder } from '../../../domain/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.order;

  execute(order: IOrder): Observable<IResponse> {
    return this.http.post<IResponse>(this.apiUrl, order, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
