import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IMenu } from '../../domain/model/menu.model';


@Injectable({
  providedIn: 'root'
})
export class GetMenuService {
  private readonly _http = inject(HttpClient);

  execute(id: number): Observable<IMenu> {
    return this._http.get<IMenu>(environment.apiUrl + 'menu/' + id);
  }
}