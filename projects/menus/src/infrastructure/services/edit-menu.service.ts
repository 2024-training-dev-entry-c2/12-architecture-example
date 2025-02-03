import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menus.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { MenusState } from '../../domain/state/menus.state';

@Injectable({
  providedIn: 'root'
})
export class EditMenuService {
  private readonly apiUrl = environment.apiUrls.menu;
     private readonly menusState = inject(MenusState);
     private readonly _http = inject(HttpClient);
   
     getMenusState() {
       return this.menusState.store();
     }
   
     editMenus(menu: IMenu): Observable<IMenu>{
      return this._http.put<IMenu>(this.apiUrl + `/${menu.id}`, menu);
     }
}
