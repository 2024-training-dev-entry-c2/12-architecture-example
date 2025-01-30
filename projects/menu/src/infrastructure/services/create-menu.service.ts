import { Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menus.model';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {
  private baseUrl = 'http://localhost:8080/api/menus';
  
  constructor(private http: HttpClient) {}

  createMenu(menu: IMenu): Observable<IMenu> {
    return this.http.post<IMenu>(this.baseUrl, menu);
  }

}
