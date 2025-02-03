import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IClient } from '../../domain/model/clients.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateClientsService {

  private http = inject(HttpClient);

  createClient(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(`${environment.BASE_URL}clients`, client);
  }
}
