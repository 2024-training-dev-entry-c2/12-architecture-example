import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IDish } from '../../domain/model/dishes.model'; 

@Injectable({
  providedIn: 'root'
})
export class ListDishService {
  private readonly _http = inject(HttpClient);

  listDishes(idMenu: number): Observable<IDish[]> {
    return this._http.get<IDish[]>(`${environment.apiUrl}/menus/${idMenu}/dishes`);
  }

}
