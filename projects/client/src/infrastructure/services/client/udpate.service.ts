import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, IResponse } from 'shared';
import { IClient } from '../../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class UdpateService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.client;

  execute(clientId: number, client: IClient): Observable<IResponse> {
    return this.http.put<IResponse>(this.apiUrl + '/' + clientId, client, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }
}
