import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iclient } from '../../domain/model/client.model';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class GetClientService {
  private readonly _http = inject(HttpClient);
  execute(): Observable<Iclient[]> {
    return this._http.get<Iclient[]>(`${environment.URL_CLIENTS}all`);
  }
}
