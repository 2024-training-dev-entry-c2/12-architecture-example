import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../../domain/model/client.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetClientsService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<IClient[]> {
    return this._http.get<IClient[]>(urlResources.clients, { headers: this.getHeaders()});
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }

}
