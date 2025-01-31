import { inject, Injectable } from '@angular/core';
import { IDish } from '../../../domain/model/dish.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, IResponse } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.dish;

  execute(dishId: number, dish: IDish): Observable<IResponse> {
    return this.http.put<IResponse>(this.apiUrl + '/' + dishId, dish, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
