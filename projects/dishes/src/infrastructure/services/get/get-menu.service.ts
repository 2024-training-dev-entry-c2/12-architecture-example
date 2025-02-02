import { inject, Injectable } from '@angular/core';

import { IDish } from '../../../public-api';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlResources } from '../../../../../shared/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetMenuService {
  private http = inject(HttpClient);
  getDishId(id: number): Observable<IDish> {
    return this.http.get<any>(`${urlResources.dish}/${id}`).pipe(
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
