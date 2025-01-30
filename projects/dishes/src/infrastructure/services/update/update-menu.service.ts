import { inject, Injectable } from '@angular/core';

import { IDish } from '../../../public-api';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDishRequest } from 'dishes';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
  private http = inject(HttpClient);
  updateDish(dish: IDishRequest, id: number): Observable<IDish> {
    return this.http
      .put<IDish>( `http://localhost:8080/dishfoods/${id}`, dish)
      .pipe(
        map((response) => this.validateObjectResponse(response)),
        catchError((error) => {
          console.error('Error fetching dishfood:', error);
          return throwError(() => new Error('Failed to fetch dishfood'));
        })
      );
  }
  protected validateObjectResponse(response: any): IDish {
    if (
      typeof response.id === 'number' &&
      typeof response.name === 'string' &&
      typeof response.price === 'number' &&
      typeof response.isPopular === 'boolean' &&
      typeof response.menu === 'string' &&
      typeof response.orderList === 'object'
    ) {
      return response as IDish;
    } else {
      throw new Error('Invalid dishfood structure');
    }
  }

}
