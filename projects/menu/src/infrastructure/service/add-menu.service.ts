import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../domain/model/menu.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'shared';



@Injectable({
  providedIn: 'root'
})
export class AddMenuService {

  private http = inject(HttpClient);

  create(menu: Partial<IMenu>): Observable<IMenu> {
    return this.http.post<IMenu>(environment.apiUrl + 'menu', menu);
  }
}
