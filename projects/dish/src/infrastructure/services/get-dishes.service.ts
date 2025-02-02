import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RESOURCES } from 'shared';
import { IDish } from '../../domain/model/dish.model';

@Injectable({
  providedIn: 'root',
})
export class GetDishesService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<IDish[]> {
    return this._http.get<IDish[]>(RESOURCES.DISHES);
  }
}
