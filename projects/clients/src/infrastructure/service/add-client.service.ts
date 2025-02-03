import { inject, Injectable } from '@angular/core';
import { IClient } from '../../domain/model/client.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';



@Injectable({
  providedIn: 'root'
})
export class AddClientService {

  private http = inject(HttpClient);

  create(client: Partial<IClient>): Observable<IClient> {
    return this.http.post<IClient>(environment.apiUrl + 'client', client);
  }
}
