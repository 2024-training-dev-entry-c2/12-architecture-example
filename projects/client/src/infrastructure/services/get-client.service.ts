import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IClient } from '../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class GetClientService {

  private readonly _http = inject(HttpClient);

  execute(): Observable<IClient[]> {
    return this._http.get<IClient[]>(urlResources.client.baseUrl);
  }
}
