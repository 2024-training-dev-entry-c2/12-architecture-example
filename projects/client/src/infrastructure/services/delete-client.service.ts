import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {
  private readonly _http = inject(HttpClient);

  deleteClient(id: number): Observable<void> {
    return this._http.delete<void>(environment.apiUrl + `/clients/${id}`);
  }
}
