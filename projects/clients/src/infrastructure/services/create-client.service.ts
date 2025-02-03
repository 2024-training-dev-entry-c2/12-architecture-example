
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iclient } from '../../domain/model/client.model';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class CreateClientService {
  private readonly _http = inject(HttpClient);

  execute(client: Iclient): Observable<Iclient> {
    return this._http.post<Iclient>(`$${environment.URL_CLIENTS}save`, client)
  }
}
