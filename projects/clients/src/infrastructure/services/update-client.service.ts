import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClientRequest } from '../../domain/model/client-request.model';
import { Observable } from 'rxjs';
import { IClient } from '../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateClientService {
  private http = inject(HttpClient);
    
  execute(id: string, clientRequest: IClientRequest): Observable<IClient> {
    return this.http.put<IClient>(`/clientes/${id}`, clientRequest);
  }
}
