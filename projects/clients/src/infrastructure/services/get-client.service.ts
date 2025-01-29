import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IClients } from '../../domain/model/clients.model';


@Injectable({
  providedIn: 'root'
})
export class GetClientService {
  private apiUrl = 'http://localhost:8080/api/clients';
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = this.apiUrl; 

  getClients(): Observable<IClients[]> {
    return this._http.get<IClients[]>(`${this.baseUrl}`);
  }

  getClientById(id: number): Observable<IClients> {
    return this._http.get<IClients>(`${this.baseUrl}/${id}`);
  }
}

