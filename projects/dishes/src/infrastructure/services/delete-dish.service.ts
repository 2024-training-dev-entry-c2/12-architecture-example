import { inject, Injectable } from '@angular/core';
import { environment } from 'shared';
import { DishesState } from '../../domain/state/dish.state';
import { HttpClient } from '@angular/common/http';
import { IDishes } from '../../public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteDishService {
 private readonly apiUrl = environment.apiUrls.dish;
  private readonly dishesState = inject(DishesState);
  private readonly _http = inject(HttpClient);

  getDishesState() {
    return this.dishesState.store();
  }

  deleteDish(dish: IDishes): Observable<IDishes>{
   return this._http.delete<IDishes>(this.apiUrl + `/${dish.id}`);
  }
}
