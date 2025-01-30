import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDishRequest } from '../../domain/model/dish-request.model';
import { Observable } from 'rxjs';
import { IDish } from '../../domain/model/dish.model';

@Injectable({
  providedIn: 'root'
})
export class CreateDishService {
  private http = inject(HttpClient);

  execute(dish : IDishRequest): Observable<IDish>{
    return this.http.post<IDish>('/platos',dish);
  }
}
