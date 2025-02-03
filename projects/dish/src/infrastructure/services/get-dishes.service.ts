import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idish } from '../../domain/model/dish.model';
import { environment } from 'shared';

@Injectable({ providedIn: 'root' })
export class GetDishesService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<Idish[]> {
    return this._http.get<Idish[]>(`${environment.URL_DISH}`);
  }
}
