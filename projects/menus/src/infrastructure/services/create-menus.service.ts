import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menus.model';
import { environment } from 'shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateMenusService {
  private http = inject(HttpClient);

  createMenu(menu: IMenu): Observable<IMenu> {
    return this.http.post<IMenu>(`${environment.BASE_URL}menus`, menu);
  }
}
