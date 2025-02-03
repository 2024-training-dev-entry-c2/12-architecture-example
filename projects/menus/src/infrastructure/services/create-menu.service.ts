import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../../domain/model/menu.model';
import { urlResources } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {
  private http = inject(HttpClient);

  execute(menuRequest : IMenu): Observable<IMenu>{
    return this.http.post<IMenu>(urlResources.menus, menuRequest);
  }
}
