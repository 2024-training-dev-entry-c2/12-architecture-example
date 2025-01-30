import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenuRequest } from '../../domain/model/menu-request.model';
import { Observable } from 'rxjs';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {
  private http = inject(HttpClient);

  execute(menuRequest : IMenuRequest): Observable<IMenu>{
    return this.http.post<IMenu>('/menus',menuRequest);
  }
}
