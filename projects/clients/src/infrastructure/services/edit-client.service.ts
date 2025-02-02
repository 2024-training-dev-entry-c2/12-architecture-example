import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'shared';
import { ClientsState } from '../../domain/state/client.state';
import { HttpClient } from '@angular/common/http';
import { IClients } from '../../public-api';

@Injectable({
  providedIn: 'root'
})
export class EditClientService {
 private readonly apiUrl = environment.apiUrls.client;
  private readonly clientsState = inject(ClientsState);
  private readonly _http = inject(HttpClient);

  getClientsState() {
    return this.clientsState.store();
  }

  editClient(client: IClients): Observable<IClients>{
   return this._http.put<IClients>(this.apiUrl + `/${client.id}`, client);
  }
}
