import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menu.model';
import { urlResources } from 'shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
  private http = inject(HttpClient);

  execute(menuId: number, menu: IMenu): Observable<IMenu> {
    return this.http.put<IMenu>(`${urlResources.menu}/${menuId}`, menu, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}
