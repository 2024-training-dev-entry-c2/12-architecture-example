import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../../../domain/model/client.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
private http = inject(HttpClient);

  createClient(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(urlResources.clients, client);
  }
}
