import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/clients.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
  private readonly _http = inject(HttpClient);

  createClient(client: IClient): Observable<IClient> {
    return this._http.post<IClient>(environment.apiUrl + '/clients', client,  { responseType: 'text' as 'json' });
  }
}
