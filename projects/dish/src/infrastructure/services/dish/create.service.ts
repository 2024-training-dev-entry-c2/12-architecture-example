import { inject, Injectable } from '@angular/core';
import { IDish } from '../../../domain/model/dish.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, IResponse } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.dish;

  execute(dish: IDish): Observable<IResponse> {
    return this.http.post<IResponse>(this.apiUrl, dish, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
