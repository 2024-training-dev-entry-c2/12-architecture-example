import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../domain/model/dish.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateDishService {
  private http = inject(HttpClient);

  execute(dish : IDish): Observable<IDish>{
    return this.http.post<IDish>(urlResources.dishes, dish);
  }
}
