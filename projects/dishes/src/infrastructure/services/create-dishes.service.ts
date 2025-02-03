import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../domain/model/dishes.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateDishesService {
  private readonly http = inject(HttpClient);

  createDish(dish: IDish): Observable<IDish> {
    return this.http.post<IDish>(`${environment.BASE_URL}dishes`, dish);
  }
}
