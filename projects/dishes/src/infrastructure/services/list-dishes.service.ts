import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../domain/model/dish.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ListDishesService {
  private http = inject(HttpClient);

  execute(): Observable<IDish[]>{
    return this.http.get<IDish[]>(urlResources.dishes);
  }
}
