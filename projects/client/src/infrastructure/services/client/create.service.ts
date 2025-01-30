import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../../../domain/model/client.model';
import { environment, IResponse } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.client;

  execute(client: IClient): Observable<IResponse> {
    return this.http.post<IResponse>(this.apiUrl,client, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }
}
