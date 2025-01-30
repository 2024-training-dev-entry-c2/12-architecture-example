import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../../domain/model/clients.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateClientService {
private baseUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}

  updateClient(id: number, payload: IClient): Observable<IClient> {
    return this.http.put<IClient>(`${this.baseUrl}/${id}`, payload);
  }
}
