import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IClient } from '../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateClientService {

  private readonly _http = inject(HttpClient);

  execute(client: IClient): Observable<IClient> {
    return this._http.put<IClient>(
      urlResources.client.operationsById(client.id),
      client,
      {
        headers: this.getHeaders(),
        responseType: 'text' as 'json',
      }
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
