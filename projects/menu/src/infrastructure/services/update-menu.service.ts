import { Injectable } from '@angular/core';
import { IMenu, IMenuResponse } from '../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
private baseUrl = 'http://localhost:8080/api/menus';

  constructor(private http: HttpClient) {}

  updateMenu(id: number, payload: IMenu): Observable<IMenu> {
    return this.http.put<IMenu>(`${this.baseUrl}/${id}`, payload);
  }
}
