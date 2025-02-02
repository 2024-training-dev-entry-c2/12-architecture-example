import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu } from '../../domain/models/menu.model';
import { RESOURCES } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class GetMenusService {
  private readonly _http = inject(HttpClient);

  execute(): Observable<IMenu[]> {
    return this._http.get<IMenu[]>(RESOURCES.MENUS);
  }
}
