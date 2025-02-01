import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'shared';
import { IClient } from '../../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class GetNameService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.client;

  execute(orderId: number): Observable<IClient> {
    return this.http.get<IClient[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        map(clients => {
          return clients.find(client => client.orders?.some(order => order.id === orderId));
        })
      );
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
