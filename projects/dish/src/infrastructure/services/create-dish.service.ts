import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlResources } from 'shared';
import { Observable } from 'rxjs';
import { IDish, IDishResponse } from '../../domain/model/dish.model';

@Injectable({
  providedIn: 'root',
})
export class CreateDishService {
  private http = inject(HttpClient);

  execute(payload: IDish): Observable<IDishResponse> {
    return this.http.post<IDishResponse>(urlResources.dish, payload);
  }
}
