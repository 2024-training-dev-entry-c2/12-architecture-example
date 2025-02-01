import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { IResponse, urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
  private _http = inject(HttpClient);

  execute(client: IClient): Observable<IResponse> {
    return this._http.post<IResponse>(urlResources.clients, client);
  }
}
