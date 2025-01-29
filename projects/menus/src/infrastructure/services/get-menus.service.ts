import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menus.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetMenusService {

  private apiUrl = 'http://localhost:8080/api/menus';
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = this.apiUrl; 

  getMenus(): Observable<IMenu[]> {
    return this._http.get<IMenu[]>(`${this.baseUrl}`);
  }
}
