import { Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListMenusService {
  private baseUrl = 'http://localhost:8080/api/menus';

  constructor(private http: HttpClient) {}

  getMenus(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(this.baseUrl);
  }

}
