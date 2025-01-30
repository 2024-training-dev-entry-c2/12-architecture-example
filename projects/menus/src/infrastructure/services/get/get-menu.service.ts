import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IMenu } from '../../../domain/model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class GetMenuService {
  private http = inject(HttpClient);
  getMenuId(id: number): Observable<IMenu> {
    return this.http.get<any>(`http://localhost:8080/menus/${id}`).pipe(
      map((response) => this.validateObjectResponse(response)),
      catchError((error) => {
        console.error('Error fetching menus:', error);
        return throwError(() => new Error('Failed to fetch menus'));
      })
    );
  }
  private validateObjectResponse(response: any): Menu {
    if (
      typeof response.id === 'number' &&
      typeof response.name === 'string' &&
      typeof response.dishfoods === 'object'
    ) {
      return response as Menu;
    } else {
      throw new Error('Invalid menu structure');
    }
  }
}
