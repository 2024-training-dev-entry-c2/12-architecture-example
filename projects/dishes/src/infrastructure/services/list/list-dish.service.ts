import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';
import { IDish } from '../../../public-api';
import { urlResources } from '../../../../../shared/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListDishService {


  private http = inject(HttpClient);
  getDishes(): Observable<IDish[]> {
    return this.http.get<any>(urlResources.dish).pipe(
      map((response) => this.validateResponse(response)),
      catchError((error) => {
        console.error('Error fetching menus:', error);
        return throwError(() => new Error('Failed to fetch menus'));
      })
    );
  }

  private validateResponse(response: any): any[] {
    if (Array.isArray(response)) {
      return response.map((dish) => {
        if (
          typeof dish.id === 'number' &&
          typeof dish.name === 'string' &&
          typeof dish.price === 'number' &&
          typeof dish.isPopular === 'boolean' &&
          typeof dish.menu === 'string' &&
          typeof dish.orderList === 'object'
        ) {
          return dish as IDish;
        } else {
          throw new Error('Invalid dishfood structure');
        }
      });
    } else {
      throw new Error('Invalid response structure');
    }
  }
}
