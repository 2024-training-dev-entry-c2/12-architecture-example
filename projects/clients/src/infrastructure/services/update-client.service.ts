import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../../domain/model/client.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateClientService {
  private http = inject(HttpClient);
    
  execute(id: string, clientRequest: IClient): Observable<IClient> {
    return this.http.put<IClient>(urlResources.clientOperationsById(id), clientRequest);
  }
}
