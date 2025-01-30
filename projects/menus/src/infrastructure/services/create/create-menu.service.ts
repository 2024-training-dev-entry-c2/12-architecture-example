import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IMenu, IMenuRequest } from '../../../domain/model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {
  private http = inject(HttpClient);
  addMenu(menu: IMenuRequest): Observable<IMenu> {
    return this.http.post<IMenu>('http://localhost:8080/menus', menu).pipe(
      map((response) => this.validateObjectResponse(response)),
      catchError((error) => {
        console.error('Error fetching menus:', error);
        return throwError(() => new Error('Failed to fetch menus'));
      })
    );
  }
  private validateObjectResponse(response: any): IMenu {
    if (
      typeof response.id === 'number' &&
      typeof response.name === 'string' &&
      typeof response.dishfoods === 'object'
    ) {
      return response as IMenu;
    } else {
      throw new Error('Invalid menu structure');
    }
  }
}
