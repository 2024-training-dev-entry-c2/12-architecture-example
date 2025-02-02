import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDishes } from '../../domain/model/dishes.model';

import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetDishesService {
 private readonly apiUrl = environment.apiUrls.dish;
  private readonly _http = inject(HttpClient);

  getDishes(): Observable<IDishes[]> {
    return this._http.get<IDishes[]>(`${this.apiUrl}`);
  }


}
