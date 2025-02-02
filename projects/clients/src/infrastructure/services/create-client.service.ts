import { inject, Injectable } from '@angular/core';
import { IClients } from '../../domain/model/clients.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientsState } from '../../domain/state/client.state';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
  private readonly apiUrl = environment.apiUrls.client;
  private readonly clientsState = inject(ClientsState);
  private readonly _http = inject(HttpClient);

  getClientsState() {
    return this.clientsState.store();
  }

  createClient(client: IClients): Observable<IClients>{
   return this._http.post<IClients>(this.apiUrl, client);
  }

}
