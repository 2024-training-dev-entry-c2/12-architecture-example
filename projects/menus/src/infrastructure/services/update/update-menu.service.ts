import { inject, Injectable } from '@angular/core';
import { IMenu, IMenuRequest } from '../../../domain/model/menu.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
  private http = inject(HttpClient);
  updateMenu(menu: IMenuRequest, id: number): Observable<IMenu> {
    return this.http.put<IMenu>(`http://localhost:8080/menus/${id}`, menu).pipe(
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
