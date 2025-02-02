import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetMenusService {

 private readonly apiUrl = environment.apiUrls.menu;
  private readonly _http = inject(HttpClient);

  getMenus(): Observable<IMenu[]> {
    return this._http.get<IMenu[]>(`${this.apiUrl}`);
  }
}
