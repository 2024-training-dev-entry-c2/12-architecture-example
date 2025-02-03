import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ListMenusService {
  private readonly _http = inject(HttpClient);

  getMenus(): Observable<IMenu[]> {
    return this._http.get<IMenu[]>(environment.apiUrl + '/menus');
  }

}
