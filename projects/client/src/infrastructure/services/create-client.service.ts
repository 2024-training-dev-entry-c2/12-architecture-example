import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../../domain/model/clients.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
private baseUrl = 'http://localhost:8080/api/clients';
  
  constructor(private http: HttpClient) {}

  createClient(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(this.baseUrl, client);
  }
}
