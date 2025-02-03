import { inject, Injectable } from '@angular/core';
import { IDish } from '../../domain/model/dish.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class DeleteDishService {
  private _http = inject(HttpClient);
  
  execute(dishId: number): Observable<IDish> {
    return this._http.delete<IDish>(`${urlResources.dishes}/${dishId}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }
}
