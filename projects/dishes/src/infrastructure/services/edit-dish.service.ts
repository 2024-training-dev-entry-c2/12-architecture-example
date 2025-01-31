import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'shared';
import { IDishes } from '../../domain/model/dishes.model';
import { Observable } from 'rxjs';
import { DishesState } from '../../domain/state/dish.state';

@Injectable({
  providedIn: 'root'
})
export class EditDishService {
 private readonly apiUrl = environment.apiUrls.dish;
   private readonly dishesState = inject(DishesState);
   private readonly _http = inject(HttpClient);
 
   getDishesState() {
     return this.dishesState.store();
   }
 
   editDish(dish: IDishes): Observable<IDishes>{
    return this._http.put<IDishes>(this.apiUrl + `/${dish.id}`, dish);
   }
}
