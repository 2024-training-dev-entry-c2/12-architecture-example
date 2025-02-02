import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class AddDishService {
  private http = inject(HttpClient);

  addDish(payload: IDish): Observable<IDish> {
    return this.http.post<IDish>(urlResources.dishes, payload);
  }
}
