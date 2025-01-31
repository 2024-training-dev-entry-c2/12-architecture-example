
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iclient } from '../../domain/model/client.model';

@Injectable({providedIn: 'root'})
export class DeleteClientService {
  private readonly _http = inject(HttpClient);

  execute(id: number): Observable<Iclient> {
    return this._http.delete<Iclient>('http://localhost:8080/api/users/borrar/' + id)
  }
}
