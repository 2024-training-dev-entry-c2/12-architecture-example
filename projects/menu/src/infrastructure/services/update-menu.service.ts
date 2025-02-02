import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlResources } from 'shared';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuService {
  private readonly _http = inject(HttpClient);

  execute(menu: IMenu): Observable<IMenu> {
    return this._http.put<IMenu>(
      urlResources.menu.operationsById(menu.id),
      menu,
      {
        headers: this.getHeaders(),
        responseType: 'text' as 'json',
      }
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
