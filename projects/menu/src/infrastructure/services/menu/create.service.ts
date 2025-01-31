import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, IResponse } from 'shared';
import { IMenu } from '../../../domain/model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.menu;

  execute(menu: IMenu): Observable<IResponse> {
    return this.http.post<IResponse>(this.apiUrl, menu, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }
}
