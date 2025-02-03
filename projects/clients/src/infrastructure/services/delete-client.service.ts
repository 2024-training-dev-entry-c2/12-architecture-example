import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IClient } from '../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {
  private _http = inject(HttpClient);
  
  execute(clientId: number): Observable<IClient> {
    return this._http.delete<IClient>(`${urlResources.clients}/${clientId}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

}
