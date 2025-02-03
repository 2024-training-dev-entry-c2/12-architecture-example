import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';
import { IDish } from '../../domain/model/dish.model';



@Injectable({
  providedIn: 'root'
})
export class AddDishService {

  private http = inject(HttpClient);

  create(dish: Partial<IDish>): Observable<IDish> {
    return this.http.post<IDish>(environment.apiUrl + 'dish', dish);
  }
}
