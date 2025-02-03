import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IDish } from '../../domain/model/dishes.model'; 

@Injectable({
  providedIn: 'root'
})
export class CreateDishService {
  private readonly _http = inject(HttpClient);

  createDish(idMenu: number, dish: IDish): Observable<IDish> {
    return this._http.post<IDish>(`${environment.apiUrl}/menus/${idMenu}/dishes`, dish);
  }

}
