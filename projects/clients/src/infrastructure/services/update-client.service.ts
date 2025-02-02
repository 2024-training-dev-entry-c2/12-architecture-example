import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { environment, IResponse, urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateClientService {
  private http = inject(HttpClient);

  execute(clientId: number, client: IClient): Observable<IResponse> {
    return this.http.put<IResponse>(`${urlResources.clients}/${clientId}`, client, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
