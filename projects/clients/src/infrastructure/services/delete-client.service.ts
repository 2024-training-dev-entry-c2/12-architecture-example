import { inject, Injectable } from '@angular/core';
import { ClientsState } from '../../domain/state/client.state';
import { HttpClient } from '@angular/common/http';

import { environment } from 'shared';
import { Observable } from 'rxjs';
import { IClients } from '../../public-api';

@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {
  private readonly apiUrl = environment.apiUrls.client;
  private readonly clientsState = inject(ClientsState);
  private readonly _http = inject(HttpClient);

  getClientsState() {
    return this.clientsState.store();
  }

  deleteClient(client: IClients): Observable<IClients>{
   return this._http.delete<IClients>(this.apiUrl + `/${client.id}`);
  }
}
