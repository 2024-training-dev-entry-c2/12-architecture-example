import { inject, Injectable } from '@angular/core';
import { IMenu } from '../../../domain/model/menu.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetNameService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrls.menu;

  execute(dishId: number): Observable<IMenu> {
    return this.http.get<IMenu[]>(this.apiUrl, { headers: this.getHeaders()})
    .pipe(
      map(menus => {
        return menus.find(menu => menu.dishes?.some(dish => dish.id === dishId));
      })
    );
  }

  private getHeaders() {
    return new HttpHeaders()
    .append('Content-Type', 'application/json')
  }
}
