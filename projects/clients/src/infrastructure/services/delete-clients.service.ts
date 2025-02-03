import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {

  private http = inject(HttpClient);

  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}clients/${id}`);
  }
}
