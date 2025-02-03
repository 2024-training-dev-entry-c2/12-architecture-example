import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
  private _http = inject(HttpClient);

  execute(client: IClient): Observable<IClient> {
    console.log(client);
    return this._http.post<IClient>('http://localhost:8080/api/v1/clients', client, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
