import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESOURCES } from 'shared';
import { IDish } from '../../domain/model/dish.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateDishService {
  private readonly _http = inject(HttpClient);

  execute(dish: IDish) {
    return this._http.put<IDish>(RESOURCES.dishById(dish.id), dish);
  }
}
