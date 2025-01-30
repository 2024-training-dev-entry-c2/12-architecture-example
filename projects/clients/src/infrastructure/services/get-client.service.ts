import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IClients } from '../../domain/model/clients.model';
import { environment } from 'shared';


@Injectable({
  providedIn: 'root'
})
export class GetClientService {
  private readonly apiUrl = environment.apiUrls.client;
  private readonly _http = inject(HttpClient);

  getClients(): Observable<IClients[]> {
    return this._http.get<IClients[]>(`${this.apiUrl}`);
  }


}

