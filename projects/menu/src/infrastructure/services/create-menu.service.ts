import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menus.model';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {
  private readonly _http = inject(HttpClient);

  createMenu(menu: IMenu): Observable<IMenu> {
    return this._http.post<IMenu>(environment.apiUrl + '/menus', menu);
  }

}
