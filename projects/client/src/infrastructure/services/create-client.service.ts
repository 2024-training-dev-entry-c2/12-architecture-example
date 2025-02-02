import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { urlResources } from 'shared';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CreateClientService {
  private readonly _http = inject(HttpClient);

  execute(client: IClient): Observable<IClient> {
    return this._http.post<IClient>(urlResources.client.baseUrl, client);
  }
}
