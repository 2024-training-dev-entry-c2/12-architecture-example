import { inject, Injectable } from '@angular/core';
import { IMenu, IMenuResponse } from '../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
  private readonly _http = inject(HttpClient);

  updateMenu(id: number, payload: IMenu): Observable<IMenu> {
    return this._http.put<IMenu>(environment.apiUrl + `/menus/${id}`, payload);
  }
}
