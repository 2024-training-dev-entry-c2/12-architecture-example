import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../../domain/model/clients.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ListClientsService {
  private readonly _http = inject(HttpClient);

  getClients(): Observable<IClient[]> {
    return this._http.get<IClient[]>(environment.apiUrl + '/clients');
  }

}
