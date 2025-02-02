import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../../domain/model/menu.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuService {
  private readonly _http = inject(HttpClient);

  execute(menu: IMenu): Observable<IMenu> {
    return this._http.post<IMenu>(urlResources.menu.baseUrl, menu);
  }
}
