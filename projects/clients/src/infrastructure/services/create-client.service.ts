import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {
private http = inject(HttpClient);
  urlbase = 'http://localhost:8080/api/cliente';

  createClient(payload: IClient): Observable<IClient> {
    return this.http.post<IClient>(this.urlbase, payload);
  }
}
