import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IClient } from '../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {

  private readonly _http = inject(HttpClient);

  execute(id: number): Observable<IClient> {
    return this._http.delete<IClient>(urlResources.client.baseUrl + '/' + id);
  }
}
