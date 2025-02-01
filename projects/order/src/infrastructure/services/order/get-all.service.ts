import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IOrder } from '../../../domain/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class GetAllService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.order;

  execute(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
