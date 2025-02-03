import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {
  private _http = inject(HttpClient);

  execute(menu: IMenu): Observable<IMenu> {
    console.log(menu);
    return this._http.post<IMenu>(urlResources.menu, menu, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }

}
