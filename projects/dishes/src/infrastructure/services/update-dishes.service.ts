import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../domain/model/dishes.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateDishesService {
  private http = inject(HttpClient);

  updateDish(dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${environment.BASE_URL}dishes/${dish.id}`, dish);
  }
}
