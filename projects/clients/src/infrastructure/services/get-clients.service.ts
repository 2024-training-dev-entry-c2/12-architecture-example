import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../../domain/model/client.model';
import { HttpClient } from '@angular/common/http';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetClientsService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<IClient[]> {
    return this._http.get<IClient[]>(urlResources.clients);
  }

}
