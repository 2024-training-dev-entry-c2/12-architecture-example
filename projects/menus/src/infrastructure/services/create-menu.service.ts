import { inject, Injectable } from '@angular/core';
import { environment } from 'shared';
import { IMenu } from '../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { MenusState } from '../../domain/state/menus.state';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {

 private readonly apiUrl = environment.apiUrls.menu;
   private readonly dishesState = inject(MenusState);
   private readonly _http = inject(HttpClient);
 
   getMenusState() {
     return this.dishesState.store();
   }
 
   createMenu(menu: IMenu): Observable<IMenu> {
     return this._http.post<IMenu>(this.apiUrl, menu);
   }
}
