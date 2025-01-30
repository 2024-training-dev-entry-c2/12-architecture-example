import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IClient } from '../../domain/model/client.model';

@Injectable({
  providedIn: 'root',
})
export class GetClientsService {
  private http = inject(HttpClient);
  urlbase = 'http://localhost:8080/api/cliente';

  execute(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.urlbase);
  }
}
