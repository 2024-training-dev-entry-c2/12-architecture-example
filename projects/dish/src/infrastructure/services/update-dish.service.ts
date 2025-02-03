import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idish } from '../../domain/model/dish.model';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class UpdateDishService {
  private readonly _http = inject(HttpClient);

  execute(dish: Idish): Observable<Idish> {
    return this._http.put<Idish>(
      `${environment.URL_DISH}/actualizar/${dish.id}`,
      dish
    );
  }
}
