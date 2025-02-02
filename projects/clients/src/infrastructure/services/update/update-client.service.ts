import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../../../domain/model/client.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class UpdateClientService {
  private http = inject(HttpClient);

  updateClient(client: IClient): Observable<IClient> {
    return this.http.put<IClient>(
      urlResources.clientsOperationsById(client.id.toString()),
      client
    );
  }
}
