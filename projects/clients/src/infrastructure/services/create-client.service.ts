import { inject, Injectable } from '@angular/core';
import { IClientRequest } from '../../domain/model/client-request.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
  private http = inject(HttpClient);

  execute(clientRequest : IClientRequest): Observable<IClient>{
    return this.http.post<IClient>('/clientes',clientRequest);
  }
}
