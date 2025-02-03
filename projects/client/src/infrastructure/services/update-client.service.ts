import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/clients.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateClientService {
  private readonly _http = inject(HttpClient);

  updateClient(id: number, payload: IClient): Observable<IClient> {
    return this._http.put<IClient>(environment.apiUrl + `/clients/${id}`, payload);
  }
}
