import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateDishService {

  private http = inject(HttpClient);

  updateDish(dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(urlResources.dishesOperationsById(dish.id.toString()), dish);
  }
}
