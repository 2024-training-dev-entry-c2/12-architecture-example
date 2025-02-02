import { inject, Injectable } from '@angular/core';
import { environment } from 'shared';
import { MenusState } from '../../domain/state/menus.state';
import { HttpClient } from '@angular/common/http';
import { IMenu } from '../../domain/model/menus.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteMenuService {

  private readonly apiUrl = environment.apiUrls.menu;
  private readonly dishesState = inject(MenusState);
  private readonly _http = inject(HttpClient);

  getMenusState() {
    return this.dishesState.store();
  }

  deleteMenu(menu: IMenu): Observable<IMenu>{
   return this._http.delete<IMenu>(this.apiUrl + `/${menu.id}`);
  }
}
