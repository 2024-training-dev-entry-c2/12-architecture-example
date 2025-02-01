import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idish } from '../../domain/model/dish.model';

@Injectable({ providedIn: 'root' })
export class CreateDishService {
  private readonly _http = inject(HttpClient);

  execute(dish: Idish): Observable<Idish> {
    return this._http.post<Idish>(
      'http://localhost:8080/api/dish/add',
      dish
    );
  }
}
