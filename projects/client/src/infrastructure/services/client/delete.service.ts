import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, IResponse } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.client;

  execute(clientId: number): Observable<IResponse> {
    return this.http.delete<IResponse>(this.apiUrl + '/' + clientId, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }
}
