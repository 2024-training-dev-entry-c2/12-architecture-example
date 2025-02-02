import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class DeleteClientService {
  private _http = inject(HttpClient);
  
  execute(clientId: number): Observable<IResponse> {
    return this._http.delete<IResponse>(`${urlResources.clients}/${clientId}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

}
