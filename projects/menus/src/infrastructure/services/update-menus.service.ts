import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenusService {
  private http = inject(HttpClient);

  updateMenu(menu: IMenu): Observable<IMenu> {
    return this.http.put<IMenu>(`${environment.BASE_URL}dishes/${menu.id}`, menu);
  }
}
