import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../../domain/model/menu.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class DeleteMenuService {
  private _http = inject(HttpClient);
  
  execute(menuId: number): Observable<IMenu> {
    return this._http.delete<IMenu>(`${urlResources.menu}/${menuId}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

}
