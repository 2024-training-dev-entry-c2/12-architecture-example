
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iclient } from '../../domain/model/client.model';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class UpdateClientService {
  private readonly _http = inject(HttpClient);

  execute(client: Iclient): Observable<Iclient> {
    return this._http.put<Iclient>(`${environment.URL_CLIENTS}editar/${client.id}`, client)
  }
}
