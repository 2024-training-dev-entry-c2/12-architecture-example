import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IDish } from '../../domain/model/menus.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateDishService {
  private readonly _http = inject(HttpClient);

  updateDish(idMenu: number, idDish: number, dishUpdated: IDish): Observable<IDish> {
    return this._http.put<IDish>(`${environment.apiUrl}/menus/${idMenu}/dishes/${idDish}`, dishUpdated);
  }

}
