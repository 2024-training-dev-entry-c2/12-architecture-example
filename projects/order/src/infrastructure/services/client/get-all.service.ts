import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IClient } from '../../../domain/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class GetAllService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.client;

  execute(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
