import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../../domain/model/clients.model';

@Injectable({
  providedIn: 'root'
})
export class ListClientsService {
private baseUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.baseUrl);
  }

}
