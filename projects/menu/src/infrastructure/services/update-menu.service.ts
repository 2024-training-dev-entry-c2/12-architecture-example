import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESOURCES } from 'shared';
import { IMenu } from '../../domain/models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuService {
  private readonly _http = inject(HttpClient);

  execute(menu: IMenu) {
    return this._http.put<IMenu>(RESOURCES.menuById(menu.menuId), menu);
  }
}
