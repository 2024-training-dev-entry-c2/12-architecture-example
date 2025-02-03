import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMenu } from '../../domain/model/menus.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class ListMenusService {
  private http = inject(HttpClient);

  getMenus(): Observable<IMenu[]> {
    return this.http.get<{ success: boolean; message: string; data: IMenu[] }>(`${environment.BASE_URL}menus`)
      .pipe(
        map(response => response.data)
      );
  }
}
