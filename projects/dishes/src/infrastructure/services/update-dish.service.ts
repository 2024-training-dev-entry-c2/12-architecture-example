import { inject, Injectable } from '@angular/core';
import { IDish } from '../../domain/model/dish.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateDishService {
  private http = inject(HttpClient);

  execute(dishId: number, dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${urlResources.dishes}/${dishId}`, dish, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
