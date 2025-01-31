import { inject, Injectable } from '@angular/core';
import { environment } from 'shared';
import { DishesState } from '../../domain/state/dish.state';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IDishes } from '../../public-api';

@Injectable({
  providedIn: 'root',
})
export class CreateDishService {
  private readonly apiUrl = environment.apiUrls.dish;
  private readonly dishesState = inject(DishesState);
  private readonly _http = inject(HttpClient);

  getDishesState() {
    return this.dishesState.store();
  }

  createDish(client: IDishes): Observable<IDishes> {
    return this._http.post<IDishes>(this.apiUrl, client);
  }
}
