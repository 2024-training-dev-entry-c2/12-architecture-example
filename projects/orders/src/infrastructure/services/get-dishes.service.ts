import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IDish } from '../../domain/model/dish.model';

@Injectable({
  providedIn: 'root'
})
export class GetDishesService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<IDish[]> {
    return this._http.get<IDish[]>(urlResources.dishes, { headers: this.getHeaders()});
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
