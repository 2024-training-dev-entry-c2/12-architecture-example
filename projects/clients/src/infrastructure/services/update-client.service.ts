
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iclient } from '../../domain/model/client.model';

@Injectable({providedIn: 'root'})
export class UpdateClientService {
  private readonly _http = inject(HttpClient);

  execute(client: Iclient): Observable<Iclient> {
    return this._http.put<Iclient>('http://localhost:8080/api/users/editar/' + client.id, client)
  }
}
