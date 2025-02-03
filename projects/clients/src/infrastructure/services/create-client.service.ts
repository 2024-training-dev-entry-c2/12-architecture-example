import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../../domain/model/client.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
  private http = inject(HttpClient);

  execute(clientRequest : IClient): Observable<IClient>{
    return this.http.post<IClient>(urlResources.clients, clientRequest);
  }
}
