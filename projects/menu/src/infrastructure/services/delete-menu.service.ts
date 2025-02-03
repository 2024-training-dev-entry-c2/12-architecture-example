import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuService {
  private readonly _http = inject(HttpClient);

  execute(id: number): Observable<IMenu> {
    return this._http.delete<IMenu>(urlResources.menu.baseUrl + '/' + id);
  }
}
