import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IMenu } from '../../domain/model/menu.model';


@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
  private readonly _http = inject(HttpClient);

  execute(menu: IMenu): Observable<IMenu> {
    return this._http.put<IMenu>(environment.apiUrl + 'menu/' + menu.id, menu);
  }
}